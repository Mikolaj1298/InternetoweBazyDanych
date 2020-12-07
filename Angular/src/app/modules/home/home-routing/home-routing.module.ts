import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../home.component';
import {FirstLoginDialogComponent} from '../components/first-login-dialog/first-login-dialog.component';
import {HomeMainComponent} from '../pages/home-main/home-main.component';
import {AddApartmentDialogComponent} from '../components/add-apartment-dialog/add-apartment-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'first-login',
        component: FirstLoginDialogComponent
      },
      {
        path: 'main',
        component: HomeMainComponent
      },
      {
        path: 'add-apartment',
        component: AddApartmentDialogComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
