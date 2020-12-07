import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import { HomeComponent } from './home.component';
import {SharedModule} from '../../shared/shared.module';
import {HomeRoutingModule} from './home-routing/home-routing.module';
import { HomeMainComponent } from './pages/home-main/home-main.component';
import { FirstLoginDialogComponent } from './components/first-login-dialog/first-login-dialog.component';
import { AddApartmentDialogComponent } from './components/add-apartment-dialog/add-apartment-dialog.component';
import { InvitationDialogComponent } from './components/invitation-dialog/invitation-dialog.component';
import { ContractDownloadDialogComponent } from './components/contract-download-dialog/contract-download-dialog.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeMainComponent,
    FirstLoginDialogComponent,
    AddApartmentDialogComponent,
    InvitationDialogComponent,
    ContractDownloadDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
  ]
})
export class HomeModule { }
