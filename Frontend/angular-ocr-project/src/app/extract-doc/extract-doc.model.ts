import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ExtractDocComponent } from './extract-doc.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
    declarations:[
        ExtractDocComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        RouterModule,
        PdfViewerModule,
        
    ],
    providers: [AuthService]
})

export class ExtractDocModule{}