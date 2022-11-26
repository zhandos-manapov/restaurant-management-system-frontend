import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FullComponent } from './layouts/full/full.component';
import { RouteGuard } from './services/route.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'cafe',
    component: FullComponent,
    canActivate: [RouteGuard],
    data: { expectedRole: ['admin', 'user'] },
    children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'category', loadChildren: () => import('./manage-category/manage-category.module').then(m => m.ManageCategoryModule) },
      { path: 'product', loadChildren: () => import('./manage-product/manage-product.module').then(m => m.ManageProductModule) },
      { path: 'order', loadChildren: () => import('./manage-order/manage-order.module').then(m => m.ManageOrderModule) },
      { path: 'user', loadChildren: () => import('./manage-user/manage-user.module').then(m => m.ManageUserModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
