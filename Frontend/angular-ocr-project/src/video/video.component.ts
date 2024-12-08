import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('VideoComponent has been initialized');
    // Ajoutez d'autres logiques ici si nécessaire
  }
  

}