import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

const materialModules = [
  MatTableModule,
  MatSortModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatInputModule,
  MatButtonModule,
];

@NgModule({
  declarations: [ModalComponent, InputComponent, ButtonComponent],
  imports: [CommonModule, ...materialModules],
  exports: [
    ModalComponent,
    InputComponent,
    ButtonComponent,
    ...materialModules,
  ],
})
export class SharedModule {}
