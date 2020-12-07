import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ApartmentComponent} from '../apartment.component';
import {ApartmentDashboardComponent} from '../pages/apartment-dashboard/apartment-dashboard.component';
import {UserPanelComponent} from '../pages/user-panel/user-panel.component';

const routes: Routes = [
  {
    path: '',
    component: ApartmentComponent,
    children: [
      {
        path: 'apartment-dashboard/:id',
        component: ApartmentDashboardComponent
      },
      {
        path: 'user-panel/:id',
        component: UserPanelComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ApartmentRoutingModule { }
