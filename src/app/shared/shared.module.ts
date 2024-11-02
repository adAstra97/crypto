import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { InputSearchComponent } from './components/input-search/input-search.component';

@NgModule({
  declarations: [ButtonComponent, ModalComponent, InputSearchComponent],
  imports: [CommonModule, FormsModule],
  exports: [ButtonComponent, ModalComponent, InputSearchComponent],
})
export class SharedModule {}
