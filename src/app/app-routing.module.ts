import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './components/cars/cars.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactComponent } from './components/contact/contact.component';
import { EditCarsComponent } from './components/Dashboard-comp/edit-cars/edit-cars.component';
import { ListComponent } from './components/Dashboard-comp/list/list.component';
import { OrdersComponent } from './components/Dashboard-comp/orders/orders.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PayComponent } from './components/pay/pay.component';
import { PaysComponent } from './components/pays/pays.component';
import { QaComponent } from './components/qa/qa.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { AuthGuard } from './Guard/auth.guard';
import { ResetPassword } from './models/reset-password.model';

const routes: Routes = [

  {path:'', redirectTo:'cars',pathMatch:'full'},

  {path:'cars', component: CarsComponent},

  {path:'cart', component: CartComponent},

{
  path: 'register',
  component: RegisterComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'dashboard',
  component: DashboardComponent, canActivate:[AuthGuard]
},
{
  path: 'pay',
  component: PayComponent, canActivate:[AuthGuard]
},
{
  path: 'dashboard/list', 
  component: ListComponent, canActivate:[AuthGuard]
},
{
  path: 'dashboard/orders', 
  component: OrdersComponent, canActivate:[AuthGuard]
},
{
  path: 'dashboard/edit-cars',
  component: EditCarsComponent, canActivate:[AuthGuard]
},
{
  path: 'q&a',
  component: QaComponent
},
{
  path: 'contact',
  component: ContactComponent
},
{
  path: 'pays',
  component: PaysComponent
},
{
  path: 'reset',
  component: ResetpasswordComponent
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
