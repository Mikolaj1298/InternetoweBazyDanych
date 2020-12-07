import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {NavbarComponent} from './components/navbar/navbar.component';
import {MaterialModule} from '../modules/material/material.module';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule {
}
