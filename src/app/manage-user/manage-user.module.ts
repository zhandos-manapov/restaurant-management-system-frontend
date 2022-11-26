import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUserComponent } from './manage-user.component';
import { MaterialModule } from '../shared/material.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ManageUserComponent, data: { expectedRole: ['admin'] } }
]

@NgModule({
  declarations: [
    ManageUserComponent
  ],
  imports: [
    CommonModule, 
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class ManageUserModule { }
