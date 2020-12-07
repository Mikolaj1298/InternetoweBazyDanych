import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AccountConfigurationComponent} from '../account-configuration.component';

const routes: Routes = [
  {
    path: '',
    component: AccountConfigurationComponent,
    children: [
      {
        path: 'user-type',
        component: AccountConfigurationComponent
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
export class AccountConfigurationRoutingModule { }
