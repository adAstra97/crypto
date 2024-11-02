import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { InputSearchComponent } from './components/input-search/input-search.component';

const materialModules = [MatProgressSpinnerModule];

@NgModule({
  declarations: [ButtonComponent, ModalComponent, InputSearchComponent],
  imports: [CommonModule, FormsModule, ...materialModules],
  exports: [
    ButtonComponent,
    ModalComponent,
    InputSearchComponent,
    ...materialModules,
  ],
})
export class SharedModule {}
