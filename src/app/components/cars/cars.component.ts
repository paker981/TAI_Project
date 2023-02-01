import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { car } from 'src/app/models/car.model';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  public carList: any;
  public filterCategory : any
  searchKey:string ="";
  iloscForm: any;

  constructor(private fb:FormBuilder ,private api: ApiService, private cartService : CartService) { }
  


  ngOnInit(): void {

    this.iloscForm = this.fb.group({
      ilosc: [1,Validators.required]
    })

    this.api.getCars()
    .subscribe(res=>{
      this.carList = res;
      this.filterCategory = res;
      console.log(this.filterCategory);
      this.carList.forEach((a:any) => {
        Object.assign(a,{quantity:this.iloscForm.get('ilosc').value,total:a.price});
      });
    });

    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }

  addtocart(car: any){
    car.quantity = this.iloscForm.get('ilosc').value;
    car.total *= car.quantity;
    this.cartService.addtoCart(car);
  }

  filter(category:string){
    this.filterCategory = this.carList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }
}
