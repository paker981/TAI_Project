import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PracownicyService } from 'src/app/services/pracownicy.service';

import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit  {
  [x: string]: any;


  registrationForm!: FormGroup;
  type: string = "password"
  eyeIcon: string = "fa-eye-slash";
  fieldTextType: boolean = false;



constructor(private toastr: ToastrService, private route: ActivatedRoute , private router: Router, private fb: FormBuilder, private auth: AuthService){ };



ngOnInit(): void {

  this.registrationForm = this.fb.group({
    imie: ['',Validators.required],
    email: ['',Validators.required],
    numer: ['',Validators.required],
    firma: ['',Validators.required],
    plec : ['',Validators.required],
    haslo: ['',Validators.required]
  })
}

  toogleFieldTextType() {
    this.fieldTextType= !this.fieldTextType;
    this.fieldTextType ? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash";
    this.fieldTextType ? this.type = "text" : this.type ="password";
  }


addUzyt(){
  var email = this.registrationForm.controls['email'].value;
  this.auth.getEmailUzyt(email)
  .subscribe({
    next: (uzytkownik) => {
      this.auth.addUzytkownik(this.registrationForm.value)
      .subscribe({
        next: (uzytkownik) =>{}
      })
      this.toastr.success('Poprawnie zarejestrowano!');
      this.router.navigate(['Pracownicy']);
    },
    error: (Response) => {
      this.toastr.error('Konto o takim adresie email już isnieje!');
    }
  })
}
  onSingIn(){
    if(this.registrationForm.valid){
      console.log(this.registrationForm.controls['email'].value);
      var email = this.registrationForm.controls['email'].value;
      this.auth.getEmailUzyt(email)
      .subscribe({
        next: () => {
     this.auth.addUzytkownik(this.registrationForm.value)
     .subscribe({
      next:(res)=>{
        this.toastr.success('Poprawnie zarejestrowano, teraz możesz się zalogować');
        this.router.navigate(['login']);
      },
      error:(err)=>{
        this.toastr.error(err.error.message);
      }
    })
  },
  error:(err)=>{
    this.toastr.error('Konto o takim adresie email już isnieje!');
  }
})
    }
      else{
        ValidateForm.validateAllFormFields(this.registrationForm);
        this.toastr.error('Podaj dane rejestracji!');
      }
    }

}


