import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService, CartSummary } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  summary$!: Observable<CartSummary>;
 
  constructor(
    public cartService: CartService,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.summary$ = this.cartService.summary$;
  }
 
  increment(weight: string): void { this.cartService.incrementQty(weight); }
  decrement(weight: string): void { this.cartService.decrementQty(weight); }
  remove(weight: string):    void { this.cartService.removeItem(weight); }
 
  checkout(): void { this.router.navigate(['/checkout']); }
  continueShopping(): void { this.router.navigate(['/']); }
}
