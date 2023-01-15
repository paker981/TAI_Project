import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { pracownik } from 'src/app/models/pracownik.model';
import { PracownicyService } from 'src/app/services/pracownicy.service';

@Component({
  selector: 'app-add-pracownik',
  templateUrl: './add-pracownik.component.html',
  styleUrls: ['./add-pracownik.component.css']
})
export class AddPracownikComponent implements OnInit {
addPracownikRequest: pracownik ={
  id: '',
  imie: '',
  email: '',
  numer: 0,
  firma: '' 
}
constructor(private pracownikService : PracownicyService, private router: Router){

}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


addPracownik(){
  this.pracownikService.addPracownik(this.addPracownikRequest)
  .subscribe({
    next: (pracownik) => {
      this.router.navigate(['Pracownicy']);
    }
  })
}

}