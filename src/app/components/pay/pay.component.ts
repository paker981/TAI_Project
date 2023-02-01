import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { render } from 'creditcardpayments/creditCardPayments'
import { UserStoreService } from 'src/app/services/user-store.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

declare var paypal: any;

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit{
  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;

  public cars : any = [];
  public grandTotal!: number;
  public email !: string;
  public quantity !: number; 
  public orderForm!: FormGroup;
  constructor(private fb: FormBuilder,private api: ApiService,private auth: AuthService,private userStore: UserStoreService,private toastr: ToastrService ,private cartService : CartService, private router: Router) { }
    
  
  
  

  ngOnInit(): void {

    this.orderForm = this.fb.group({
      quantity: [0],
      price: [0],
      paid: [''],
      status: [''],
      email: ['']
    })

    this.userStore.getEmailFromStore()
    .subscribe(val=>{
      let roleFromToken = this.auth.getEmailFromToken();
      this.email = val || roleFromToken
    });

    this.orderForm.controls['email'].setValue(this.email);


    this.cartService.getProducts()
     .subscribe(res=>{
      this.cars = res;
      this.quantity = this.cars.length;
      this.grandTotal = this.cartService.getTotalPrice();
      this.orderForm.controls['price'].setValue(this.grandTotal);
      this.orderForm.controls['quantity'].setValue(this.quantity);
    })

    paypal
          .Buttons({
            createOrder: (data:any, action: any) =>{
              
              return action.order.create({
              purchase_units: [
                {
                amount: {
                    currency_code: 'USD',
                    value: this.grandTotal
                }
              }
            ]
          });
        },
        onApprove: async  (data:any, action: any) =>{
          this.toastr.success("Zapłacono");
          this.orderForm.controls['price'].setValue(this.grandTotal);
          this.orderForm.controls['paid'].setValue("Zapłacono");
          this.orderForm.controls['status'].setValue("Opłacone/Zrealizowane");
          this.api.addOrder(this.orderForm.value)
          .subscribe({
            next:(res)=>{
              this.toastr.success("Sprawdź status zamowienia!");
              this.router.navigate(['cars']);
              this.cartService.removeAllCart();
            },
            error:(err)=>{
              this.toastr.error("Coś poszło nie tak!");
            }
          })
       }, 
        onError: (err:any) => {
          this.toastr.error("Błąd płatności");
          this.cartService.removeAllCart();
          this.orderForm.controls['quantity'].setValue(this.quantity);
          this.orderForm.controls['price'].setValue(this.grandTotal);
          this.orderForm.controls['paid'].setValue("Niezapłacone");
          this.orderForm.controls['status'].setValue("Nieopłacone/Niezrealizowane");
          this.api.addOrder(this.orderForm.value)
          .subscribe({
            next:(res)=>{
              this.toastr.success("Sprawdź status zamowienia!");
              this.router.navigate(['cars']);
            },
            error:(err)=>{
              this.toastr.error("Coś poszło nie tak!");
            }
          })
        }
        
          })
          .render(this.paypalElement.nativeElement);
  
}
}
