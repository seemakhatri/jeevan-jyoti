import { Component } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
 cartCount$ = this.cartService.itemCount$;

  isMobileNavOpen = false;

  constructor(private cartService: CartService) {}

toggleCart(): void {
  this.cartService.toggleCart();
}

  toggleMobileNav(): void {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }

  showAdminLogin(): void {
    console.log('Open Admin Login');

    // Example:
    // this.router.navigate(['/admin']);
  }
}
