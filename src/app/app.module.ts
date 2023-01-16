import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PracownicyListaComponent } from './components/Pracownicy/pracownicy-lista/pracownicy-lista.component';
import { AddPracownikComponent } from './components/Pracownicy/add-pracownik/add-pracownik.component';
import { FormsModule } from '@angular/forms';
import { EditPracownikComponent } from './components/Pracownicy/edit-pracownik/edit-pracownik.component';
import { DeletePracownikComponent } from './components/Pracownicy/delete-pracownik/delete-pracownik.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    PracownicyListaComponent,
    AddPracownikComponent,
    EditPracownikComponent,
    DeletePracownikComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
