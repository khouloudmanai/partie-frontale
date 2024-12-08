import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { ArchivesListComponent } from './archiveComponents/archives-list/archives-list.component';
import { ArchivesShowComponent } from './archiveComponents/archives-show/archives-show.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocsComponent } from './docs/docs.component';
import { CreateDocumentComponent } from './DocumentComponents/create-document/create-document.component';
import { DocsTablesComponent } from './DocumentComponents/docs-tables/docs-tables.component';
import { EditDocumentComponent } from './DocumentComponents/edit-document/edit-document.component';
import { ListDocumentsComponent } from './DocumentComponents/list-documents/list-documents.component';
import { ShowDocumentComponent } from './DocumentComponents/show-document/show-document.component';
import { ExtractDocComponent } from './extract-doc/extract-doc.component';
import { FrontTemplateComponent } from './front-template/front-template.component';
import { ContactComponent } from './frontcomponents/contact/contact.component';
import { SolutionsComponent } from './frontcomponents/solutions/solutions.component';
import { MainDashComponent } from './main-dash/main-dash.component';
import { MainComponent } from './main/main.component';
import { ChangePasswordComponent } from './UserComponent/change-password/change-password.component';
import { NewPasswordComponent } from './UserComponent/new-password/new-password.component';
import { ResetPasswordComponent } from './UserComponent/reset-password/reset-password.component';

const routes: Routes = [
  {path:'',component: FrontTemplateComponent ,
    children :[
      {path:'',component: MainComponent},
      {path:'auth',component: AuthComponent},
      {path:'reset',component: ResetPasswordComponent},
      {path:'new-password/:uidb64/:token',component:NewPasswordComponent},
      {path:'extractNow',component: ExtractDocComponent},
      {path:'contactUs',component: ContactComponent},
      {path:'ourServices',component: SolutionsComponent},
    
    ]},
      

  {path:'dashboard',component: DashboardComponent,
    children:[
      {path:'main', component :MainDashComponent},
      {path:'profile',component: AccountComponent},
      {path:'change',component: ChangePasswordComponent},
      {path:'createDoc',component: CreateDocumentComponent},
      {path:'listDocs',component: ListDocumentsComponent},
      {path:'editDoc/:id',component: EditDocumentComponent},
      {path:'showDoc/:id',component: ShowDocumentComponent},
      {path:'tableDocs',component: DocsTablesComponent},
      {path:'listArchives',component: ArchivesListComponent},
      {path:'showArchive/:id',component: ArchivesShowComponent},

    ]},
  
 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
