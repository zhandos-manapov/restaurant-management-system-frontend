import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageOrderComponent } from './manage-order.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { OrderFormComponent } from './order-form/order-form.component';

const routes: Routes = [
  { path: '', component: ManageOrderComponent, data: { expectedRole: ['admin', 'user'] } }
]

@NgModule({
  declarations: [
    ManageOrderComponent,
    OrderFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ManageOrderModule { }
