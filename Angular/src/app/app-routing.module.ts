import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {AuthGuard} from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing-page/main',
    pathMatch: 'full'
  },
  {
    path: 'landing-page',
    loadChildren: () => import('./modules/landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'configuration',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/account-configuration/account-configuration.module').then(m => m.AccountConfigurationModule)
  },
  {
    path: 'apartment',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/apartment/apartment.module').then(m => m.ApartmentModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  exports: []
})
export class AppRoutingModule {
}
