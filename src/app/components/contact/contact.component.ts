import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
//import './../../assets/smtp';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor(private toastr: ToastrService, private http: HttpClient) { 
  }
  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      const email = contactForm.value;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('https://formspree.io/f/xyyakpno',
        { name: email.name, replyto: email.email, message: email.messages },
        { 'headers': headers }).subscribe(
          response => {
            console.log(response);
            this.toastr.success("Email sent!");
            contactForm.reset();
          }
        );
    }
  }
}
