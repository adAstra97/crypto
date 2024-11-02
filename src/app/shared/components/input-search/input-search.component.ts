import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss',
})
export class InputSearchComponent {
  public searchTerm = '';

  @Output() searchChange = new EventEmitter<string>();

  public onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.searchChange.emit(this.searchTerm);
  }
}
