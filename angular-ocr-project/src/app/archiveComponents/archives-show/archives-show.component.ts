import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/auth.model';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { Document } from 'src/app/DocumentComponents/document.model';
import { DocService } from 'src/app/DocumentComponents/document.service';
import Swal from 'sweetalert2';
import { Archive } from '../archive.model';
import { ArchiveService } from '../archive.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-archives-show',
  templateUrl: './archives-show.component.html',
  styleUrls: ['./archives-show.component.css']
})
export class ArchivesShowComponent implements OnInit,OnDestroy {

  user: User;
  userSub: Subscription;
  url: any; //Angular 11, for stricter type

  DJANGO_SERVER = 'http://127.0.0.1:8000'
  response;
  imageURL;
  archive : Archive;
  archive_id:any;
  docs :Document[];
  Alldocs :Document[]=[];
  AllPassdocs :Document[]=[];
  AllVitdocs :Document[]=[];
  OverAllDocs:Document[]=[];

  AlldocsFilter:Document[];

  doco:any;
  selected = [];
  AddDocForm : FormGroup;
  docsToDelete =[];
  selectF: Boolean = false;

 
  private archiveSub: Subscription;
  private docsSub: Subscription;

  constructor(private archiveService: ArchiveService ,private docService: DocService ,private dash: DashboardComponent ,private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {

    this._Activatedroute.paramMap.subscribe(params => { 
      this.archive_id = params.get("id")
    }),
    this.user = this.dash.user ;
    this.selected=[];
    this.OverAllDocs=[];
    this.Alldocs =[];
    this.AllPassdocs =[];
    this.AllVitdocs =[];

    this.archiveSub =this.archiveService.detailArchive(this.archive_id).subscribe((data:Archive)=>{
      this.archive=data;
      this.docsSub=this.archiveService.getDocs(data.id).subscribe((datax:any)=>{
        for (let i = 0; i < Object.keys(datax).length; i++)
    {
        this.doco =new Document(datax[i].pk,datax[i]['fields']['title'],
          datax[i]['fields']['description'],datax[i]['fields']['creationDate'],
          datax[i]['fields']['modelType'],datax[i]['fields']['owner'],datax[i]['fields']['file'],
          datax[i]['fields']['data'],datax[i]['fields']['vitale_data']);
        
          datax[i]=this.doco;
    }

    this.docService.listDocs(this.user.user_id).subscribe((datay:any)=>{
    
      for (let i = 0; i < Object.keys(datay).length; i++)
      {
        if(datay[i]['modelType']=='PASSPORT')
        {
          this.AllPassdocs.push(datay[i]);
        }
        else if(datay[i]['modelType']=='VITALE')
        {
          this.AllVitdocs.push(datay[i]);
        }
      }


      this.Alldocs=datay;


      this.Alldocs.forEach( (item, index) => {
      
        for (let j = 0; j < Object.keys(datax).length; j++)
        {
        if(item.id == datax[j].id) 
        {
          this.Alldocs.splice(index,1);
          
        }
        
      }
      });

      this.AllPassdocs.forEach( (item, index) => {
      
        for (let j = 0; j < Object.keys(datax).length; j++)
        {
        if(item.id == datax[j].id) 
        {
          this.AllPassdocs.splice(index,1);
        }
        
      }
      });

      this.AllVitdocs.forEach( (item, index) => {
      
        for (let j = 0; j < Object.keys(datax).length; j++)
        {
        if(item.id == datax[j].id) 
        {
          this.AllVitdocs.splice(index,1);
        }
        
      }
      });
      if(data.type =='Mixed')
      this.OverAllDocs=this.Alldocs;
      else if(data.type=='PASSPORT')
      this.OverAllDocs=this.AllPassdocs;
      else if(data.type=='VITALE')
      this.OverAllDocs=this.AllVitdocs;
      
    
      console.log("tttttttttttttttttttttttt");
      console.log(this.Alldocs);
      console.log(this.AllPassdocs);
      console.log(this.AllVitdocs);
      console.log(this.OverAllDocs);
      console.log("tttttttttttttttttttttttt");

    
    });
        
        this.docs =datax
        console.log(this.docs)
      });


      

  
    });
    
    
   
   
    this.AddDocForm = new FormGroup({
      'selected' : new FormControl(this.selected),
     });


  }


  OnDelete(doc_id :string){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
      
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ),
        this.docService.deleteDoc(doc_id).subscribe(response => {
          console.log(response);
          this.ngOnInit();
        })

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

ngOnDestroy(): void {
  this.archiveSub.unsubscribe(); 
  this.docsSub.unsubscribe(); 

}

onCheckDoc(doc_id)
{
 if(this.docsToDelete.length ==0)
 {
  this.docsToDelete.push(doc_id);
 }
  
  else if(this.docsToDelete.indexOf(doc_id) == -1)
  {
    this.docsToDelete.push(doc_id);
  }

  else if(this.docsToDelete.indexOf(doc_id) != -1)
  {
    this.docsToDelete.splice(this.docsToDelete.indexOf(doc_id),1);
  }

  console.log(this.docsToDelete);

}


onAddDoc()
{
  console.log(this.selected);
  let legValues = {
    'id': this.archive_id,
    'filesNumber' : this.archive.filesNumber,
    'documents' : this.selected.map(({id})=>id)

  } 
  this.archiveService.addDocs(legValues).subscribe((res)=>{
    this.ngOnInit();
    this.selected=[];
    Swal.fire({
      title: 'Document(s) has Beed Added',
      text: "You won't be able to revert this!",
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
    })
    console.log(res);
  },
  (err) => {  
    console.log(err);
  }
);

console.log(legValues);
 
}


onDeleteDoc()
{
  console.log(this.docsToDelete);
  let legValues = {
    'id': this.archive_id,
    'filesNumber' : this.archive.filesNumber,
    'documents' : this.docsToDelete

  };
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
    
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      ),
      this.archiveService.deleteDocs(legValues).subscribe((res)=>{
        this.ngOnInit();
        this.docsToDelete=[];
        this.selectF = !this.selectF;
      })

    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })
  

console.log(legValues);
 
}

}
