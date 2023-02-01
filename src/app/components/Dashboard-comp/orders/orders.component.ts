import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { order } from 'src/app/models/order.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: order[] =[];
  email!: string; 
  constructor(private auth: AuthService ,private userStore :UserStoreService, private toastr : ToastrService,private fb: FormBuilder,private api: ApiService) {}
 
 
  ngOnInit(): void {

    this.userStore.getEmailFromStore()
    .subscribe(val=>{
      let roleFromToken = this.auth.getEmailFromToken();
      this.email = val || roleFromToken
    });

    this.api.getOrdersList(this.email)
    .subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error:(Response) => {
        console.log(Response);
      }
    })
    
    
  }


  
}
