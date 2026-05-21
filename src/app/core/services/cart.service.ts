// src/app/core/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CartItem {
  weight: string;
  price: number;
  mrp: number;
  qty: number;
}

export interface CartSummary {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  itemCount: number;
}

export const PRODUCT_VARIANTS: { [key: string]: { price: number; mrp: number } } = {
  '100g': { price: 49,  mrp: 79  },
  '250g': { price: 99,  mrp: 149 },
  '500g': { price: 179, mrp: 249 },
  '1kg':  { price: 299, mrp: 449 },
};

const FREE_SHIPPING_THRESHOLD = 499;
const SHIPPING_CHARGE = 49;
const STORAGE_KEY = 'jj_cart';

@Injectable({ providedIn: 'root' })
export class CartService {

  private _items$ = new BehaviorSubject<CartItem[]>(this.loadFromStorage());

  // ── Public Observables ───────────────────────────────────────────────────────
  items$: Observable<CartItem[]> = this._items$.asObservable();

  itemCount$: Observable<number> = this._items$.pipe(
    map(items => items.reduce((sum, i) => sum + i.qty, 0))
  );

  summary$: Observable<CartSummary> = this._items$.pipe(
    map(items => {
      const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
      const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : (items.length ? SHIPPING_CHARGE : 0);
      return {
        items,
        subtotal,
        shipping,
        total: subtotal + shipping,
        itemCount: items.reduce((s, i) => s + i.qty, 0),
      };
    })
  );

  // ── Methods ──────────────────────────────────────────────────────────────────
  addItem(weight: string, qty: number = 1): void {
    const variant = PRODUCT_VARIANTS[weight];
    if (!variant) return;

    const current = [...this._items$.value];
    const idx = current.findIndex(i => i.weight === weight);

    if (idx > -1) {
      current[idx] = { ...current[idx], qty: current[idx].qty + qty };
    } else {
      current.push({ weight, price: variant.price, mrp: variant.mrp, qty });
    }

    this.emit(current);
  }

  removeItem(weight: string): void {
    this.emit(this._items$.value.filter(i => i.weight !== weight));
  }

  updateQty(weight: string, qty: number): void {
    if (qty <= 0) { this.removeItem(weight); return; }
    const current = this._items$.value.map(i =>
      i.weight === weight ? { ...i, qty } : i
    );
    this.emit(current);
  }

  incrementQty(weight: string): void {
    const item = this._items$.value.find(i => i.weight === weight);
    if (item) this.updateQty(weight, item.qty + 1);
  }

  decrementQty(weight: string): void {
    const item = this._items$.value.find(i => i.weight === weight);
    if (item) this.updateQty(weight, item.qty - 1);
  }

  clear(): void {
    this.emit([]);
  }

  getSnapshot(): CartSummary {
    const items = this._items$.value;
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : (items.length ? SHIPPING_CHARGE : 0);
    return { items, subtotal, shipping, total: subtotal + shipping, itemCount: items.reduce((s,i)=>s+i.qty,0) };
  }

  // ── Private ───────────────────────────────────────────────────────────────────
  private emit(items: CartItem[]): void {
    this._items$.next(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  private loadFromStorage(): CartItem[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }
}