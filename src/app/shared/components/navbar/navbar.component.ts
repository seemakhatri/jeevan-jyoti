import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  cartCount = 0;

  isMobileNavOpen = false;

  // ─── CART TOGGLE ─────────────────────────────────────────
  toggleCart(): void {
    console.log('Open Cart Drawer / Modal');

    // Example:
    // this.cartService.toggleCart();

    // TEMP DEMO
    alert('Cart Opened');
  }

  // ─── MOBILE NAV ──────────────────────────────────────────
  toggleMobileNav(): void {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }

  // ─── ADMIN LOGIN ─────────────────────────────────────────
  showAdminLogin(): void {
    console.log('Open Admin Login');

    // Example:
    // this.router.navigate(['/admin']);
  }

}