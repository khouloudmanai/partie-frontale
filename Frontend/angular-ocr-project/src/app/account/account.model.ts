import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AccountComponent } from './account.component';

@NgModule({
    declarations:[
        AccountComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        RouterModule,
        
    ],
    providers: [AuthService]
})

export class AccountModule{}