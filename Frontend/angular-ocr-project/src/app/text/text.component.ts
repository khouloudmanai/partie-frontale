import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('TextComponent has been initialized');
    // Ajoutez d'autres logiques ici si nécessaire
  }
  

}