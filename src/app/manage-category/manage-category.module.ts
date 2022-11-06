import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageCategoryComponent } from './manage-category.component';
import { RouterModule, Routes } from '@angular/router';
import { CategoryFormComponent } from './category-form/category-form.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: ManageCategoryComponent, data: { expectedRole: ['admin'] } }
]

@NgModule({
  declarations: [
    ManageCategoryComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ManageCategoryModule { }
