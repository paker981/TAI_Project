import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { uzytkownik } from '../models/uzytkownik.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient, private router: Router ) { }

  getCars(){
    return this.http.get<any>(this.baseApiUrl +'/api/cars')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getAllCars(){
    return this.http.get<any>(this.baseApiUrl +'/api/cars');
    }
  addCar(car : any){
    return this.http.post<any>(this.baseApiUrl + '/api/cars',car);
  }
  updateCar(id: number, car: any) {
    return this.http.put<any>(this.baseApiUrl + '/api/cars/' + id, car);
  }
  deleteCar(id: number) {
  return this.http.delete<any>(this.baseApiUrl + '/api/cars/' + id);}

  addOrder(order : any)  {
    order.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<any>(this.baseApiUrl + '/api/Orders',order);
  }

  getEmailUzyt(email: string) {
    return this.http.get<uzytkownik>(this.baseApiUrl + '/api/User/' + email);
  }

  getOrdersList(email: string) {
    return this.http.get<any>(this.baseApiUrl +'/api/Orders/' + email);
  }
  
  getUsers() {
    return this.http.get<any>(this.baseApiUrl +'/api/User');
  }
  
  updateUserbyEmail(email:string, updateData : any)  {
    return this.http.put<any>(this.baseApiUrl + '/api/User/' + email, updateData);
  }

  updateUser(id:string, updateData : any)  {
    return this.http.put<any>(this.baseApiUrl + '/api/User/' + id, updateData);
  }

  deleteUser(id: string)  {
  return this.http.delete<any>(this.baseApiUrl + '/api/User/' + id);
  }

}
