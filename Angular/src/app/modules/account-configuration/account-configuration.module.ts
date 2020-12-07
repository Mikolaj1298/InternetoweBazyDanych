import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountConfigurationComponent } from './account-configuration.component';
import {AccountConfigurationRoutingModule} from './account-configuration-routing/account-configuration-routing.module';
import {MaterialModule} from '../material/material.module';
import {SharedModule} from '../../shared/shared.module';
import { AccountTypeComponent } from './pages/account-type/account-type.component';



@NgModule({
  declarations: [AccountConfigurationComponent, AccountTypeComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    AccountConfigurationRoutingModule
  ]
})
export class AccountConfigurationModule { }
