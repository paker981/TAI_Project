import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { car } from 'src/app/models/car.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { CarModel } from './car-list.model';

@Component({
  selector: 'app-edit-cars',
  templateUrl: './edit-cars.component.html',
  styleUrls: ['./edit-cars.component.css']
})
export class EditCarsComponent implements OnInit {

  carModelObj : CarModel = new CarModel;
  cars: car[] =[];
  formValue!: FormGroup;


  constructor(private auth: AuthService ,private userStore :UserStoreService,private toastr : ToastrService,private fb: FormBuilder,private api: ApiService) {}

  ngOnInit(): void {

    this.formValue = this.fb.group({
      id: [0],
      title: [''],
      price: [0],
      description: [''],
      category: [''],
      imgage: ['']
    })
  
    this.getAllCars();
  
  }
  
  getAllCars(){
    this.api.getAllCars()
    .subscribe({
      next: (cars) => {
        this.cars = cars;
      },
      error:(Response) => {
        console.log(Response);
      }
    })
  }
  
  onEdit(car: any){
    this.formValue.controls['id'].setValue(car.id);
    this.formValue.controls['title'].setValue(car.title);
    this.formValue.controls['price'].setValue(car.price);
    this.formValue.controls['description'].setValue(car.description);
    this.formValue.controls['category'].setValue(car.category);
    this.formValue.controls['imgage'].setValue(car.imgage);
  }
  
  
  updateCar(){
      this.carModelObj.id = this.formValue.value.id;
      this.carModelObj.title = this.formValue.value.title;
      this.carModelObj.price = this.formValue.value.price;
      this.carModelObj.description= this.formValue.value.description;
      this.carModelObj.category = this.formValue.value.category;
      this.carModelObj.imgage = this.formValue.value.imgage;
  
      this.api.updateCar(this.carModelObj.id,this.carModelObj)
      .subscribe(red=>{
        this.toastr.success("Zaktualizowano samochód!");
        let ref = document.getElementById('close');
        ref?.click();
        this.formValue.reset();
        this.getAllCars();
      },
      err=>{
        this.toastr.error("Coś poszło nie tak!");
      })
  }

  addCar(){
    this.carModelObj.id = this.formValue.value.id;
    this.carModelObj.title = this.formValue.value.title;
    this.carModelObj.price = this.formValue.value.price;
    this.carModelObj.description= this.formValue.value.description;
    this.carModelObj.category = this.formValue.value.category;
    this.carModelObj.imgage = this.formValue.value.imgage;

    this.api.addCar(this.carModelObj)
    .subscribe(red=>{
      this.toastr.success("Zaktualizowano samochód!");
      let ref = document.getElementById('close1');
      ref?.click();
      this.formValue.reset();
      this.getAllCars();
    },
    err=>{
      this.toastr.error("Coś poszło nie tak!");
    })
}
    
  
    deleteCar(car:any){
      this.api.deleteCar(car.id)
      .subscribe(res=>{
        this.toastr.success("Usunięnto samochód!");
        this.getAllCars();
      },
      err=>{
        this.toastr.error("Coś poszło nie tak!");
      })
    }
}
