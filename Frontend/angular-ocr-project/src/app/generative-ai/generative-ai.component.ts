import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generative-ai',
  templateUrl: './generative-ai.component.html',
  styleUrls: ['./generative-ai.component.css']
})
export class GenerativeAiComponent implements OnInit {  // Utilisez PascalCase ici

  constructor() { }

  ngOnInit(): void {
    console.log('GenerativeAiComponent has been initialized');
    // Ajoutez d'autres logiques ici si nécessaire
  }

}
