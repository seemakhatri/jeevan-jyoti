import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss']
})
export class CartSidebarComponent {
  isOpen = false;
  summary$ = this.cartService.summary$;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
  this.cartService.cartSidebarOpen$
    .subscribe(open => {
      this.isOpen = open;
    });
}

  open()  { this.isOpen = true; }
  close() { this.isOpen = false; }

  increment(weight: string) { this.cartService.incrementQty(weight); }
  decrement(weight: string) { this.cartService.decrementQty(weight); }
  remove(weight: string)    { this.cartService.removeItem(weight); }

  checkout() {
    this.close();
    this.router.navigate(['/checkout']);
  }
}
