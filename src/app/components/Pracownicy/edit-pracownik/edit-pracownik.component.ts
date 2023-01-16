import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pracownik } from 'src/app/models/pracownik.model';
import { PracownicyService } from 'src/app/services/pracownicy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-pracownik',
  templateUrl: './edit-pracownik.component.html',
  styleUrls: ['./edit-pracownik.component.css']
})
export class EditPracownikComponent {

pracownikDane : pracownik ={
  id: '',
  imie: '',
  email: '',
  numer: 0,
  firma: '' ,
  plec:'',
  haslo:''

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

 updatePracownik() {
  this.pracownikService.updatePracownik(this.pracownikDane.id, this.pracownikDane)
  .subscribe({
    next: (Response) => {
      this.router.navigate(['Pracownicy']);
  }
  })

}
}

