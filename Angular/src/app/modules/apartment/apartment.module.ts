import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApartmentComponent } from './apartment.component';
import {ApartmentRoutingModule} from './apartment-routing/apartment-routing.module';
import { ApartmentDashboardComponent } from './pages/apartment-dashboard/apartment-dashboard.component';
import {SharedModule} from '../../shared/shared.module';
import {MaterialModule} from '../material/material.module';
import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';
import {FormsModule} from '@angular/forms';
import { UserPanelComponent } from './pages/user-panel/user-panel.component';



@NgModule({
  declarations: [ApartmentComponent, ApartmentDashboardComponent, AddUserDialogComponent, UserPanelComponent],
    imports: [
        CommonModule,
        ApartmentRoutingModule,
        SharedModule,
        MaterialModule,
        FormsModule
    ]
})
export class ApartmentModule { }
