import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cars : any = [];
  public grandTotal !: number;
  constructor(private toastr: ToastrService ,private cartService : CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.getProducts()
     .subscribe(res=>{
      this.cars = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }
  removeItem(car: any){
    this.cartService.removeCartItem(car);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }
  payCart(){
    this.router.navigate(['pay']);
  }


}