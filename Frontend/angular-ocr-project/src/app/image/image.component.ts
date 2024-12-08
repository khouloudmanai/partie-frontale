import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {  // Utilisez PascalCase ici

  constructor() { }

  ngOnInit(): void {
    console.log('ImageComponent has been initialized');
    // Ajoutez d'autres logiques ici si nécessaire
  }

}
