import { Component, OnInit } from '@angular/core';
import { PracownicyService } from 'src/app/services/pracownicy.service';
import { pracownik } from 'src/app/models/pracownik.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {

public userIsAutenticated: boolean = false;  
public searchTerm !: string;
public ilosc: number = 0;


constructor(private router: Router, private toastr: ToastrService,private api: ApiService, private auth: AuthService, private userStore: UserStoreService,private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.ilosc= res.length;
    })

    this.auth.getAuthorize()
    .subscribe(res=>{
      this.userIsAutenticated = res;
    })
  }


  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartService.search.next(this.searchTerm);
  }

  logOut(){
    this.auth.signOut();
    this.toastr.success("Wylogowano!");
    this.router.navigate(['cars']);
  }

}

  



