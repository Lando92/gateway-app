import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GatewaysComponent} from './components/gateways/gateways.component';
import {AddEditGatewayComponent} from './components/gateways/add-edit-gateway/add-edit-gateway.component';


const routes: Routes = [
  {
    path: '',
    component: GatewaysComponent,
    data: {title: 'Gateways'},
  },
  {
    path: 'add',
    component: AddEditGatewayComponent,
    data: {title: 'Add Gateway'},
  },
  {
    path: ':id',
    component: AddEditGatewayComponent,
    data: {title: 'Edit Gateway'},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
