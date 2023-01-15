import { Component, OnInit } from '@angular/core';
import { pracownik } from 'src/app/models/pracownik.model';
import { PracownicyService } from 'src/app/services/pracownicy.service';

@Component({
  selector: 'app-pracownicy-lista',
  templateUrl: './pracownicy-lista.component.html',
  styleUrls: ['./pracownicy-lista.component.css']
})
export class PracownicyListaComponent implements OnInit{

pracownicy: pracownik[] =[];

constructor(private pracownicyService: PracownicyService) {}
ngOnInit(): void {
  this.pracownicyService.getAllPracownicy()
  .subscribe({
    next: (pracownicy) => {
      this.pracownicy = pracownicy;
    },
    error:(Response) => {
      console.log(Response);
    }
  })

}
}
