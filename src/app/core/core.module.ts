import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreRoutingModule} from './core-routing.module';
import {GatewaysComponent} from './components/gateways/gateways.component';
import {MaterialModule} from '../material.module';
import {GatewayService} from './services/gateway.service';
import {AddEditGatewayComponent} from './components/gateways/add-edit-gateway/add-edit-gateway.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [GatewaysComponent, AddEditGatewayComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [GatewayService]
})
export class CoreModule {
}
