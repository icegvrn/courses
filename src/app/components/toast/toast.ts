import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast toast--{{ toast.type }}" role="alert">
          <span class="toast__icon">
            @if (toast.type === 'success') { ✓ }
            @if (toast.type === 'error') { ✕ }
            @if (toast.type === 'info') { ℹ }
          </span>
          {{ toast.message }}
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: contents; }
    .toast__icon { font-weight: 700; font-size: 1rem; }
  `],
})
export class ToastComponent {
  toastService = inject(ToastService);
}
