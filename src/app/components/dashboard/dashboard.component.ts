import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

public users: any =[];
public name: string = "";
public role: string = "";

constructor(private api: ApiService, private auth: AuthService, private userStore: UserStoreService) {}

  ngOnInit(): void {
    this.api.getUsers()
    .subscribe(res=>{
      this.users=res;
    });

    this.userStore.getNameFromStore()
    .subscribe(val=>{
      let nameFromToken = this.auth.getNameFromToken();
      this.name = val || nameFromToken
    });

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken
    });
  }

  logOut(){
    this.auth.signOut();
  }

  
  

}
