import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { AdminLayoutComponent } from '../admin/shared/admin-layout/admin-layout.component';
import { LoginComponent } from '../admin/login/login.component';
import { AddPageComponent } from '../admin/add-page/add-page.component';
import { DashboardPageComponent } from '../admin/dashboard-page/dashboard-page.component';
import { EditPageComponent } from '../admin/edit-page/edit-page.component';
import { OrderPageComponent } from '../admin/order-page/order-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AdminLayoutComponent, children: [
          {path: 'login', component: LoginComponent},
          {path: '', redirectTo: 'admin/login', pathMatch: 'full' },
          {path: 'add-page', component: AddPageComponent},
          {path: 'product/:id/edit-page', component: EditPageComponent},
          {path: 'dashboard', component: DashboardPageComponent},
          {path: 'order-page', component: OrderPageComponent},
        ]}
    ])
  ],
  exports: [RouterModule],
  declarations: [AdminLayoutComponent, LoginComponent, AddPageComponent, DashboardPageComponent, EditPageComponent, OrderPageComponent]
})

export  class AdminModule {

}
