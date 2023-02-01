import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { order } from 'src/app/models/order.model';
import { uzytkownik } from 'src/app/models/uzytkownik.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UzytkownikModel } from '../Dashboard-comp/list/uzytkownik -list.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

user1 : UzytkownikModel = new UzytkownikModel; 
user!: any;
public name: string = "";
public role: string = "";
public email: string = "";
orders: order[] =[];
formValue!: FormGroup;
uzytkownicy: uzytkownik[] =[];


constructor(private fb: FormBuilder,private toastr: ToastrService,private api: ApiService, private auth: AuthService, private userStore: UserStoreService,private router: Router) {}

  ngOnInit(): void {

    this.formValue = this.fb.group({
      id: [''],
      imie: [''],
      email: [''],
      numer: [''],
      firma: [''],
      plec : [''],
      role : ['User']
    })

    this.userStore.getNameFromStore()
    .subscribe(val=>{
      let nameFromToken = this.auth.getNameFromToken();
      this.name = val || nameFromToken
    });
    this.userStore.getEmailFromStore()
    .subscribe(val=>{
      let nameFromToken = this.auth.getEmailFromToken();
      this.email = val || nameFromToken
    });
    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken
    });

    console.log(this.email);

    this.api.getEmailUzyt(this.email)
      .subscribe({
    next: (user) => {
      console.log(user);
      this.formValue.controls['id'].setValue(user.id);
      this.formValue.controls['imie'].setValue(user.imie);
      this.formValue.controls['email'].setValue(user.email);
      this.formValue.controls['numer'].setValue(user.numer);
      this.formValue.controls['firma'].setValue(user.firma);
      this.formValue.controls['role'].setValue(user.role);
    },
    error:(Response) => {
      console.log(Response);
    }
  })

    console.log(this.uzytkownicy);

    this.api.getOrdersList(this.email)
    .subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error:(Response) => {
        console.log(Response);
      }
    })


  }
  
  logOut(){
    this.auth.signOut();
    this.toastr.success("Wylogowano!");
    this.router.navigate(['cars']);
  }



onEdit(user: any){
  this.formValue.controls['id'].setValue(user.id);
  this.formValue.controls['imie'].setValue(user.imie);
  this.formValue.controls['email'].setValue(user.email);
  this.formValue.controls['numer'].setValue(user.numer);
  this.formValue.controls['firma'].setValue(user.firma);
  this.formValue.controls['role'].setValue(user.role);
}


updateUser(){
    this.user1.id = this.formValue.value.id;
    this.user1.imie = this.formValue.value.imie;
    this.user1.email = this.formValue.value.email;
    this.user1.numer = this.formValue.value.numer;
    this.user1.firma = this.formValue.value.firma;
    this.user1.role = this.formValue.value.role;

    this.api.updateUserbyEmail(this.user1.email,this.user1)
    .subscribe(red=>{
      this.toastr.success("Zaktualizowano użytkownika!");
      let ref = document.getElementById('close');
      ref?.click();
      this.formValue.reset();
    },
    err=>{
      this.toastr.error("Coś poszło nie tak!");
    })
}

  
  

}
