import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    year = new Date().getFullYear();
 
  links = {
    products: [
      { label: '100g Pack', fragment: 'product' },
      { label: '250g Pack', fragment: 'product' },
      { label: '500g Pack', fragment: 'product' },
      { label: '1kg Pack',  fragment: 'product' },
      { label: 'Bulk Order', route: '/contact' },
    ],
    company: [
      { label: 'About SDI',        route: '/about' },
      { label: 'Contact Us',       route: '/contact' },
      { label: 'Why Jeevan Jyoti', fragment: 'benefits' },
    ],
  };
 
  contact = {
    phone: '+91 9928937111',
    email: 'shreedevbus@gmail.com',
    gstin: '08BBMPK6633H1ZD',
  };
}
