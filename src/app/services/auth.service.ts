import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { uzytkownik } from '../models/uzytkownik.model';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseApiUrl: string = environment.baseApiUrl;
  private userPayload: any;
  constructor(private http: HttpClient, private router: Router ) {
    this.userPayload = this.decodedToken();
   }

  getEmailUzyt(email: string) :Observable<uzytkownik> {
    return this.http.get<uzytkownik>(this.baseApiUrl + '/api/User/' + email);
  }
  addUzytkownik(userObj: any) {
    userObj.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<uzytkownik>(this.baseApiUrl + '/api/User/register',userObj);
  }
  login(loginObj: any){
    return this.http.post<uzytkownik>(this.baseApiUrl + '/api/User/authenticate',loginObj);
  }

  storeToken(tokenValue : string){
    localStorage.setItem('token', tokenValue)
  }
  
  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token);
  }
  getNameFromToken() {
    if(this.userPayload)
    return this.userPayload.name;
  }
  getRoleFromToken() {
    if(this.userPayload)
    return this.userPayload.role;
  }
}
