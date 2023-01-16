
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { pracownik } from '../models/pracownik.model';

@Injectable({
  providedIn: 'root'
})
export class PracownicyService {
  
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient ) { }

  getAllPracownicy() :Observable<pracownik[]> {
    return this.http.get<pracownik[]>(this.baseApiUrl + '/api/Pracownicy');
  }
  addPracownik(addPracownikRequest : pracownik) :Observable<pracownik> {
    addPracownikRequest.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<pracownik>(this.baseApiUrl + '/api/Pracownicy',addPracownikRequest);
  }
  getPracownik(id: string) :Observable<pracownik> {
    return this.http.get<pracownik>(this.baseApiUrl + '/api/Pracownicy/' + id);
  }
  updatePracownik(id:string, updatePracownikRequest : pracownik) :Observable<pracownik> {
    return this.http.put<pracownik>(this.baseApiUrl + '/api/Pracownicy/' + id, updatePracownikRequest);
  }
  deletePracownik(id: string) :Observable<pracownik> {
  return this.http.delete<pracownik>(this.baseApiUrl + '/api/Pracownicy/' + id);

  }
}
