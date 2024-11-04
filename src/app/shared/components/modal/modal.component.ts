import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICoin } from '../../models/coin-response.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() coins?: ICoin[];
  @Input() coin?: ICoin;
  @Input() mode: 'portfolio' | 'add' = 'portfolio';
  @Output() close = new EventEmitter<void>();
  @Output() removeCoin = new EventEmitter<string>();
  @Output() addCoin = new EventEmitter<number>();

  public errorText = '';
  public quantity = 1;

  public parsePrice(price: string | undefined): number {
    return price ? +price : 0;
  }

  public confirmRemove(coinId: string): void {
    this.removeCoin.emit(coinId);
  }

  public confirmAdd(): void {
    if (this.quantity > 0 && this.quantity <= 1000) {
      this.addCoin.emit(this.quantity);
      this.closeModal();
    } else {
      this.errorText =
        'Invalid quantity. Please enter a number between 1 and 1000.';
    }
  }

  public closeModal(): void {
    this.close.emit();
  }
}
