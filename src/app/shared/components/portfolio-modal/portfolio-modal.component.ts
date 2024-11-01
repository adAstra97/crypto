import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICoin } from '../../models/coin-response.model';

@Component({
  selector: 'app-portfolio-modal',
  templateUrl: './portfolio-modal.component.html',
  styleUrl: './portfolio-modal.component.scss',
})
export class PortfolioModalComponent {
  @Input() coins!: ICoin[];
  @Output() close = new EventEmitter<void>();
  @Output() removeCoin = new EventEmitter<string>();

  public confirmRemove(coinId: string): void {
    this.removeCoin.emit(coinId);
  }

  public closeModal(): void {
    this.close.emit();
  }
}
