import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageMainComponent } from './pages/landing-page-main/landing-page-main.component';
import {LandingPageRoutingModule} from './landing-page-routing/landing-page-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {MaterialModule} from '../material/material.module';
import { LandingPageExtendComponent } from './pages/landing-page-extend/landing-page-extend.component';
import { LandingPageComponent } from './landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterSuccessfullyComponent} from './pages/register-successfully/register-successfully.component';


@NgModule({
  declarations: [LandingPageMainComponent, LandingPageExtendComponent,
    LandingPageComponent, LoginComponent, RegisterComponent, RegisterSuccessfullyComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    SharedModule,
    MaterialModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class LandingPageModule { }
