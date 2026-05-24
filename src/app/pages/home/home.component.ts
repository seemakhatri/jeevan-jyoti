import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  PRODUCT_VARIANTS,
  CartService,
} from 'src/app/core/services/cart.service';
import { ToastService } from 'src/app/core/services/toast.service';

interface Variant {
  weight: string;
  price: number;
  mrp: number;
  saving: number;
  tag?: string;
}

interface Testimonial {
  initials: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('baSlider') baSliderRef!: ElementRef<HTMLDivElement>;
  @ViewChild('baBefore') baBeforeRef!: ElementRef<HTMLDivElement>;
  @ViewChild('baHandle') baHandleRef!: ElementRef<HTMLDivElement>;

variants: Variant[] = [
  {
    weight: '100gm',
    price: 28,
    mrp: 30,
    saving: 7,
    tag: 'TRIAL',
  },
  {
    weight: '150gm',
    price: 38,
    mrp: 40,
    saving: 5,
    tag: 'POPULAR',
  },
  {
    weight: '200gm',
    price: 45,
    mrp: 50,
    saving: 10,
    tag: 'BEST VALUE',
  },
];

  selectedVariant: Variant = this.variants[0];
  qty = 1;
  showStickyBuy = false;

  benefits = [
    {
      icon: 'uil uil-stars',
      title: 'Glass-Like Shine',
      desc: 'Restores mirror-like brilliance to all metals instantly.',
    },
    {
      icon: 'uil uil-shield-check',
      title: 'Scratch-Free Formula',
      desc: 'Ultra-fine particles clean without scratching any surface.',
    },
    {
      icon: 'uil uil-balance-scale',
      title: 'Zero Metal Loss',
      desc: 'Cleans only dirt — never your precious metal.',
    },
    {
      icon: 'uil uil-brush-alt',
      title: 'Removes Tough Stains',
      desc: 'Dissolves rust, tarnish, and grime in seconds.',
    },
    {
      icon: 'uil uil-praying-hands',
      title: 'Pooja Item Safe',
      desc: 'Perfect for idols, thalis, and religious items.',
    },
    {
      icon: 'uil uil-layer-group',
      title: 'Works on 6 Metals',
      desc: 'One powder for Brass, Copper, Silver, Steel, Aluminium & Iron.',
    },
  ];

  metals = [
    { icon: 'uil uil-flask', name: 'Copper' },
    { icon: 'uil uil-bell', name: 'Brass' },
    { icon: 'uil uil-tea', name: 'Silver' },
    { icon: 'uil uil-processor', name: 'Steel' },
    { icon: 'uil uil-cube', name: 'Aluminium' },
    { icon: 'uil uil-cog', name: 'Iron' },
  ];

  // ── Testimonials ─────────────────────────────────────────────────────────────
  testimonials: Testimonial[] = [
    {
      initials: 'RS',
      name: 'Reema Sharma',
      location: 'Jaipur, Rajasthan',
      rating: 5,
      text: 'Mera purana peetal ka kalash bilkul naya jaise ho gaya! Ek hi baar mein itni shine aayi jo pehle kabhi nahi aayi. Jeevan Jyoti is amazing!',
    },
    {
      initials: 'MK',
      name: 'Manish Kumar',
      location: 'Mumbai, Maharashtra',
      rating: 5,
      text: "I use it in my restaurant for steel utensils. The shine is absolutely unmatched. We've tried many brands but Jeevan Jyoti is the best by far!",
    },
    {
      initials: 'VP',
      name: 'Vijay Patel',
      location: 'Ahmedabad, Gujarat',
      rating: 5,
      text: 'We use this in our temple for cleaning idols. The priests love it — it gives a divine glow to every piece. Ordered 1kg pack, will reorder.',
    },
  ];

  constructor(
    private cartService: CartService,
    private toast: ToastService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.showStickyBuy = window.scrollY > window.innerHeight;
    });
  }

  ngAfterViewInit(): void {
    this.initBASlider();
  }

  // ── Variant Selection ─────────────────────────────────────────────────────────
  selectVariant(v: Variant): void {
    this.selectedVariant = v;
    this.qty = 1;
  }

  // ── Qty Controls ──────────────────────────────────────────────────────────────
  incrementQty(): void {
    if (this.qty < 20) this.qty++;
  }
  decrementQty(): void {
    if (this.qty > 1) this.qty--;
  }

  // ── Add to Cart ───────────────────────────────────────────────────────────────
  addToCart(): void {
    this.cartService.addItem(this.selectedVariant.weight, this.qty);
    this.toast.success(
      `✅ Added ${this.selectedVariant.weight} × ${this.qty} to cart!`,
    );
  }

  buyNow(): void {
    this.cartService.addItem(this.selectedVariant.weight, this.qty);
    this.router.navigate(['/checkout']);
  }

  get stars(): number[] {
    return Array(5).fill(0);
  }

  getRatingStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  // ── Before/After Slider ────────────────────────────────────────────────────────
  private isDragging = false;

  initBASlider(): void {
    const slider = this.baSliderRef?.nativeElement;
    if (!slider) return;

    slider.addEventListener('mousedown', (e: MouseEvent) => {
      this.isDragging = true;
      this.moveBA(e.clientX);
    });
    slider.addEventListener('touchstart', (e: TouchEvent) => {
      this.moveBA(e.touches[0].clientX);
    });
    window.addEventListener('mousemove', (e: MouseEvent) => {
      if (this.isDragging) this.moveBA(e.clientX);
    });
    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });
    window.addEventListener('touchmove', (e: TouchEvent) => {
      this.moveBA(e.touches[0].clientX);
    });
  }

  private moveBA(clientX: number): void {
    const slider = this.baSliderRef?.nativeElement;
    const before = this.baBeforeRef?.nativeElement;
    const handle = this.baHandleRef?.nativeElement;
    if (!slider || !before || !handle) return;

    const rect = slider.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(5, Math.min(95, pct));
    before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handle.style.left = `${pct}%`;
  }

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
