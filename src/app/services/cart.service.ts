import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any =[]
  public carList1 = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }
  getProducts(){
    return this.carList1.asObservable();
  }
  getIlosc(){
    return this.carList1.asObservable.length;
  }

  setProduct(car : any){
    this.cartItemList.push(car);
    this.carList1.next(car);
  }
  addtoCart(car : any){
    this.cartItemList.push(car);
    this.carList1.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(car: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(car.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.carList1.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.carList1.next(this.cartItemList);
  }
}