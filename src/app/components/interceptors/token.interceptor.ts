import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private toastr: ToastrService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();

    if(myToken){
      request = request.clone({
        setHeaders: {Authorization:"Bearer "+ myToken}
      })
    }

    return next.handle(request).pipe(
      catchError((err:any)=>{
      if(err instanceof HttpErrorResponse){
        if(err.status == 401){
          this.toastr.warning("Token się przedawnił, Zaloguj się ponownie!");
          this.router.navigate(['login'])
        }
      }
      return throwError(()=> new Error("Jakis inny błąd!"))
    })
    );
  }
}
