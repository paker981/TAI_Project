import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.css']
})
export class QaComponent {

  myScriptElement!: HTMLScriptElement;

constructor(){
  this.myScriptElement = document.createElement("script");
  this.myScriptElement.src="src/assets/main.js";
  document.body.appendChild(this.myScriptElement);
    }
}






