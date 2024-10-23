import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [ModalComponent, InputComponent, ButtonComponent],
  imports: [CommonModule],
  exports: [ModalComponent, InputComponent, ButtonComponent],
})
export class SharedModule {}
