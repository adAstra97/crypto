import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';

const materialModules = [
  MatTableModule,
  MatSortModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [InputComponent, ButtonComponent, ModalComponent],
  imports: [CommonModule, FormsModule, ...materialModules],
  exports: [
    InputComponent,
    ButtonComponent,
    ModalComponent,
    ...materialModules,
  ],
})
export class SharedModule {}
