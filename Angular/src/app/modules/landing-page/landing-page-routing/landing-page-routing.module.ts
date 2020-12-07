import {Router, RouterModule, Routes} from '@angular/router';
import {LandingPageMainComponent} from '../pages/landing-page-main/landing-page-main.component';
import {NgModule} from '@angular/core';
import {LandingPageCanActivateGuard} from './guards/landing-page-can-activate.guard';
import {LandingPageExtendComponent} from '../pages/landing-page-extend/landing-page-extend.component';
import {LandingPageComponent} from '../landing-page.component';
import {LoginComponent} from '../pages/login/login.component';
import {RegisterComponent} from '../pages/register/register.component';
import {RegisterSuccessfullyComponent} from '../pages/register-successfully/register-successfully.component';


const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: 'main',
        component: LandingPageMainComponent,
      },
      {
        path: 'extend',
        component: LandingPageExtendComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'register-success',
        component: RegisterSuccessfullyComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LandingPageRoutingModule {
}
