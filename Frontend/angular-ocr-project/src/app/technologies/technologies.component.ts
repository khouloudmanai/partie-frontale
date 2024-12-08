import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('TechnologiesComponent has been initialized');
    // Ajoutez d'autres logiques ici si nécessaire
  }
  

}
