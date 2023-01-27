import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient, private router: Router ) { }
  
  getUsers() {
    return this.http.get<any>(this.baseApiUrl +'/api/User');
  }

}
