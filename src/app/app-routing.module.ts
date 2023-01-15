import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPracownikComponent } from './components/Pracownicy/add-pracownik/add-pracownik.component';
import { DeletePracownikComponent } from './components/Pracownicy/delete-pracownik/delete-pracownik.component';
import { EditPracownikComponent } from './components/Pracownicy/edit-pracownik/edit-pracownik.component';
import { PracownicyListaComponent } from './components/Pracownicy/pracownicy-lista/pracownicy-lista.component';

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
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
