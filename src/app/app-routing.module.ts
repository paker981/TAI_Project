import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AddPracownikComponent } from './components/Pracownicy/add-pracownik/add-pracownik.component';
import { DeletePracownikComponent } from './components/Pracownicy/delete-pracownik/delete-pracownik.component';
import { EditPracownikComponent } from './components/Pracownicy/edit-pracownik/edit-pracownik.component';
import { PracownicyListaComponent } from './components/Pracownicy/pracownicy-lista/pracownicy-lista.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './Guard/auth.guard';

const routes: Routes = [
{
  path: '',
  component: PracownicyListaComponent
},
{
  path: 'Pracownicy',
  component: PracownicyListaComponent
},

{
path: 'Pracownicy/add',
  component: AddPracownikComponent
},
{
  path: 'Pracownicy/edit/:id',
    component: EditPracownikComponent
},
{
  path: 'Pracownicy/delete/:id',
  component: DeletePracownikComponent
},
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
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
