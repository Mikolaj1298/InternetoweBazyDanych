import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatDialogModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
