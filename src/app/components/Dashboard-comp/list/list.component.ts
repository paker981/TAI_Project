import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { uzytkownik } from 'src/app/models/uzytkownik.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UzytkownikModel } from './uzytkownik -list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  uzytkownikModelObj : UzytkownikModel = new UzytkownikModel;
  uzytkownicy: uzytkownik[] =[];
  formValue!: FormGroup;
  public role: string = "";
  

constructor(private auth: AuthService ,private userStore :UserStoreService,private toastr : ToastrService,private fb: FormBuilder,private api: ApiService) {}


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

  this.getAllUsers();

  this.userStore.getRoleFromStore()
    .subscribe(val=>{
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken
    });
}

getAllUsers(){
  this.api.getUsers()
  .subscribe({
    next: (users) => {
      this.uzytkownicy = users;
    },
    error:(Response) => {
      console.log(Response);
    }
  })
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
    this.uzytkownikModelObj.id = this.formValue.value.id;
    this.uzytkownikModelObj.imie = this.formValue.value.imie;
    this.uzytkownikModelObj.email = this.formValue.value.email;
    this.uzytkownikModelObj.numer = this.formValue.value.numer;
    this.uzytkownikModelObj.firma = this.formValue.value.firma;
    this.uzytkownikModelObj.role = this.formValue.value.role;

    this.api.updateUser(this.uzytkownikModelObj.id,this.uzytkownikModelObj)
    .subscribe(red=>{
      this.toastr.success("Zaktualizowano użytkownika!");
      let ref = document.getElementById('close');
      ref?.click();
      this.formValue.reset();
      this.getAllUsers();
    },
    err=>{
      this.toastr.error("Coś poszło nie tak!");
    })
}
  

  deleteUser(user:any){
    this.api.deleteUser(user.id)
    .subscribe(res=>{
      this.toastr.success("Usunięnto użytkownika!");
      this.getAllUsers();
    },
    err=>{
      this.toastr.error("Coś poszło nie tak!");
    })
  }

  

}


