// src/app/core/services/toast.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {

  private _toast$ = new BehaviorSubject<Toast>({ message: '', type: 'success', visible: false });
  toast$ = this._toast$.asObservable();

  private timer: any;

  show(message: string, type: 'success' | 'error' | 'info' = 'success', duration = 3000): void {
    clearTimeout(this.timer);
    this._toast$.next({ message, type, visible: true });
    this.timer = setTimeout(() => {
      this._toast$.next({ ...this._toast$.value, visible: false });
    }, duration);
  }

  success(msg: string) { this.show(msg, 'success'); }
  error(msg: string)   { this.show(msg, 'error'); }
  info(msg: string)    { this.show(msg, 'info'); }
}