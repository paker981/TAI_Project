import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
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
  
  
  constructor(private toastr: ToastrService, private fb: FormBuilder, private auth: AuthService, private router: Router, private userStore: UserStoreService) { }

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
          const tokenPayLoad = this.auth.decodedToken();
          this.userStore.setNameForStore(tokenPayLoad.name);
          this.userStore.setRoleForStore(tokenPayLoad.role);
          this.toastr.success("Zalogowano!");
          this.router.navigate(['dashboard']);
        },
        error:(err)=>{
          this.toastr.error("Hasło jest nieprawidłowe!");
        }
      })
      
    }
      else{
        ValidateForm.validateAllFormFields(this.loginForm);
        this.toastr.error('Podaj dane logowania!');
      }
    }
    
    

    }






 


