import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
private name$ = new BehaviorSubject<string>("");
private role$ = new BehaviorSubject<string>("");
private email$ = new BehaviorSubject<string>("");

  constructor() { }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }
  public setRoleForStore(role: string){
    this.role$.next(role);
  }
  public getNameFromStore(){
    return this.name$.asObservable();
  }
  public getEmailFromStore(){
    return this.email$.asObservable();
  }
  public setNameForStore(name: string){
    this.role$.next(name);
  }

}
