import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TokenInterceptor } from './components/interceptors/token.interceptor';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CarsComponent } from './components/cars/cars.component';
import { FilterPipe } from './shared/filter.pipe';
import { PayComponent } from './components/pay/pay.component';
import { ListComponent } from './components/Dashboard-comp/list/list.component';
import { OrdersComponent } from './components/Dashboard-comp/orders/orders.component';
import { EditCarsComponent } from './components/Dashboard-comp/edit-cars/edit-cars.component';
import { QaComponent } from './components/qa/qa.component';
import { ContactComponent } from './components/contact/contact.component';
import { PaysComponent } from './components/pays/pays.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    CartComponent,
    CarsComponent,
    FilterPipe,
    PayComponent,
    ListComponent,
    OrdersComponent,
    EditCarsComponent,
    QaComponent,
    ContactComponent,
    PaysComponent,
    ResetpasswordComponent
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
