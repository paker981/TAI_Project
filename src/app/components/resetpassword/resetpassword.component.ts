import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  fieldTextType: boolean = false;
  type: string = "password"
  eyeIcon: string = "fa-eye-slash";
  resetForm!: FormGroup;
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;

  constructor(private router: Router, private resetService: ResetPasswordService, private fb: FormBuilder, private toastr: ToastrService){}


  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: [''],
      emailToken:[''],
      newPassword: [''],
      confirmPassword: ['']
    })

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.resetForm.controls['email'].setValue(urlParams.get('email'));
    this.resetForm.controls['emailToken'].setValue(urlParams.get('code')?.replaceAll(' ', '+'));
  }

  resetPassword(){
    if(this.resetForm.valid){
      this.resetService.resetPassword(this.resetForm.value)
      .subscribe({
        next:(res)=>{
          this.toastr.success("Zresetowano hasło, spróbuj się zalogować!");
          this.router.navigate(["login"]);
      },
      error:(err)=>{
        this.toastr.error("Cos nie tak!")
      }
      
    })

    }
    else{
      this.toastr.error("Wprowadź hasła!");
    }
  }
  

  toogleFieldTextType() {
    this.fieldTextType= !this.fieldTextType;
    this.fieldTextType ? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash";
    this.fieldTextType ? this.type = "text" : this.type ="password";
  }
}
