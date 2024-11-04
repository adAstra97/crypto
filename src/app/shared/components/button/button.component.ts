import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() label = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() cssClass = '';
  @Input() icon?: string;

  @Output() clickEvent = new EventEmitter<void>();

  public onClick(): void {
    this.clickEvent.emit();
  }
}
