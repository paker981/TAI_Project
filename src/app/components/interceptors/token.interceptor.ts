import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenApiModel } from 'src/app/models/token-api.model';

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
          //this.toastr.warning("Token się przedawnił, Zaloguj się ponownie!");
          //this.router.navigate(['login'])
          return this.handleUnAuthorizedError(request,next);
        }
      }
      return throwError(()=> new Error(err?.error.message))
    })
    );
  }

  handleUnAuthorizedError(request : HttpRequest<any>, next: HttpHandler){
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = this.auth.getToken()!;
    tokenApiModel.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewToken(tokenApiModel)
    .pipe(
      switchMap((data:TokenApiModel)=>{
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        request = request.clone({
          setHeaders: {Authorization:"Bearer "+ data.accessToken}
        })
        return next.handle(request);
      }),
      catchError((err)=>{
        return throwError(()=>{
          this.toastr.warning("Token się przedawnił, Zaloguj się ponownie!");
          this.router.navigate(['login'])
        })
      })

    
    )

  }
}
