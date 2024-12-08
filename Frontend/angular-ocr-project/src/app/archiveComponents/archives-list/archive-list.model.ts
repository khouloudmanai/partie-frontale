import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ArchiveService } from '../archive.service';
import {ArchivesListComponent} from '../archives-list/archives-list.component'


@NgModule({
    declarations:[
        ArchivesListComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        RouterModule,
        
    ],
    providers: [ArchiveService]
})

export class ArchiveModule{}