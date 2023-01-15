import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pracownik } from 'src/app/models/pracownik.model';
import { PracownicyService } from 'src/app/services/pracownicy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-pracownik',
  templateUrl: './delete-pracownik.component.html',
  styleUrls: ['./delete-pracownik.component.css']
})
export class DeletePracownikComponent {

  pracownikDane : pracownik ={
    id: '',
    imie: '',
    email: '',
    numer: 0,
    firma: '' 
  };

  constructor(private route: ActivatedRoute ,private pracownikService: PracownicyService, private router: Router)  {}

  ngOnInit(): void {
 this.route.paramMap.subscribe ({
 next: (params) => {
   const id = params.get('id')
   
   if (id) {
      this.pracownikService.getPracownik(id)
      .subscribe({
     next:(Response) => {
     this.pracownikDane = Response;
     }
 
      })
   }
 }
 
 })
  } 
 
  deletePracownik() {
   this.pracownikService.deletePracownik(this.pracownikDane.id)
   .subscribe({
     next: (Response) => {
       this.router.navigate(['Pracownicy']);
   }
   })
  }
}
