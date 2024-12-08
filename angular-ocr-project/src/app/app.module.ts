import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AccountComponent } from './account/account.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordModule } from './UserComponent/reset-password/reset-password.module';
import { VerifyEmailComponent } from './UserComponent/verify-email/verify-email.component';
import { ChangePasswordModule } from './UserComponent/change-password/change-password.module';
import { NewPasswordModule } from './UserComponent/new-password/change-password.module';
import { ListDocumentsComponent } from './DocumentComponents/list-documents/list-documents.component';
import { ShowDocumentComponent } from './DocumentComponents/show-document/show-document.component';
import { EditDocumentComponent } from './DocumentComponents/edit-document/edit-document.component';
import { CreateDocumentModule } from './DocumentComponents/create-document/create-document.model';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FrontTemplateComponent } from './front-template/front-template.component';
import { DocsComponent } from './docs/docs.component';
import { DocsModule } from './docs/docs.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { EditDocumentModule } from './DocumentComponents/edit-document/edit-document.model';
import { DocsTablesComponent } from './DocumentComponents/docs-tables/docs-tables.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchFilterPipe } from './DocumentComponents/search-filter.pipe'; // <-- import the module
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {DataTablesModule} from 'angular-datatables';
import {NgxPrintModule} from 'ngx-print';
import { AccountModule } from './account/account.model';
import { ArchivesListComponent } from './archiveComponents/archives-list/archives-list.component';
import { ArchivesAddComponent } from './archiveComponents/archives-add/archives-add.component';
import { ArchivesEditComponent } from './archiveComponents/archives-edit/archives-edit.component';
import { ArchivesShowComponent } from './archiveComponents/archives-show/archives-show.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ArchiveModule } from './archiveComponents/archives-list/archive-list.model';
import { NgSelectModule } from "@ng-select/ng-select";
import { ArchiveShowModule } from './archiveComponents/archives-show/archive-show.model';
import { MainDashComponent } from './main-dash/main-dash.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { ChartsModule } from 'ng2-charts';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ExtractDocModule } from './extract-doc/extract-doc.model';
import { SolutionsComponent } from './frontcomponents/solutions/solutions.component';
import { ContactComponent } from './frontcomponents/contact/contact.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VerifyEmailComponent,
    ListDocumentsComponent,
    ShowDocumentComponent,
    MainComponent,
    FooterComponent,
    DashboardComponent,
    FrontTemplateComponent,
    DocsTablesComponent,
    SearchFilterPipe,
    ArchivesAddComponent,
    ArchivesEditComponent,
    MainDashComponent,
    SolutionsComponent,
    ContactComponent,
   
    
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    ResetPasswordModule,
    ChangePasswordModule,
    NewPasswordModule,
    CreateDocumentModule,
    DocsModule,
    SweetAlert2Module,
    SweetAlert2Module.forRoot(),
    SweetAlert2Module.forChild({ /* options */ }),

    EditDocumentModule,
    NgxPaginationModule,
    FormsModule,
    Ng2SearchPipeModule,
    DataTablesModule,
    NgxPrintModule,
    AccountModule,
    NgbModule,
    ArchiveModule,
    ArchiveShowModule,
    NgSelectModule,
    GoogleChartsModule,
    ChartsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    ExtractDocModule,
    
  ],
    
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
