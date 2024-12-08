import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ArchiveService } from '../archive.service';
import {ArchivesShowComponent} from '../archives-show/archives-show.component'


@NgModule({
    declarations:[
        ArchivesShowComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        RouterModule,
        NgSelectModule,
        
    ],
    providers: [ArchiveService]
})

export class ArchiveShowModule{}