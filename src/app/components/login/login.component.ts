import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  

  fieldTextType: boolean = false;
  type: string = "password"
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;

  
  
  constructor(private route: ActivatedRoute,private _location : Location,private toastr: ToastrService, private fb: FormBuilder, private auth: AuthService, private router: Router, private userStore: UserStoreService, private resetService: ResetPasswordService ) { }

  ngOnInit() :void {
    this.loginForm = this.fb.group({
      email: ['',Validators.required],
      haslo: ['',Validators.required]
    })
}

  

  toogleFieldTextType() {
    this.fieldTextType= !this.fieldTextType;
    this.fieldTextType ? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash";
    this.fieldTextType ? this.type = "text" : this.type ="password";
  }

  onLogin(){
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          this.loginForm.reset();
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayLoad = this.auth.decodedToken();
          this.userStore.setNameForStore(tokenPayLoad.name);
          this.userStore.setRoleForStore(tokenPayLoad.role);
          this.toastr.success("Zalogowano!");
          this.auth.setAuthorize();
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard';
          this.router.navigateByUrl(returnUrl);
          
        },
        error:(err)=>{
          this.toastr.error("Login lub hasło jest nieprawidłowe!");
        }
      })
      
    }
      else{
        ValidateForm.validateAllFormFields(this.loginForm);
        this.toastr.error('Podaj dane logowania!');
      }
    }

    checkValidEmail(event: string){
      const val = event;
      const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      this.isValidEmail = pattern.test(val);
      return this.isValidEmail;
    }

    confirmToSend(){
      if(this.checkValidEmail(this.resetPasswordEmail)){
        console.log(this.resetPasswordEmail);
        

        this.resetService.sendResetPasswordLink(this.resetPasswordEmail)
        .subscribe({
          next:(res)=>{
            this.toastr.success("Wysłano email z linkiem resetującym!");
            this.resetPasswordEmail="";
            const buttonRef = document.getElementById("close");
            buttonRef?.click();
        },
        error:(err)=>{
          this.toastr.error("Cos nie tak!")
        }
        
      })

      }
      else{
        this.toastr.error("Wprowadź email!");
      }
    }
    
    

    }






 


