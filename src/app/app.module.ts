import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TokenInterceptor } from './components/interceptors/token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    PracownicyListaComponent,
    AddPracownikComponent,
    EditPracownikComponent,
    DeletePracownikComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
