import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICoin } from '../../../shared/models/coin-response.model';

@Component({
  selector: 'app-add-coin-modal',
  templateUrl: './add-coin-modal.component.html',
  styleUrl: './add-coin-modal.component.scss',
})
export class AddCoinModalComponent {
  @Input() coin?: ICoin;
  @Output() close = new EventEmitter<void>();
  @Output() addCoin = new EventEmitter<number>();
  public errorText = '';
  public quantity = 1;

  public confirmAdd(): void {
    if (this.quantity > 0 && this.quantity <= 1000) {
      this.addCoin.emit(this.quantity);
      this.close.emit();
    } else {
      this.errorText =
        'Invalid quantity. Please enter a number between 1 and 1000.';
    }
  }

  public closeModal(): void {
    this.close.emit();
  }
}
