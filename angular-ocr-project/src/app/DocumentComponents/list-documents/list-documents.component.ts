import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DocService } from '../document.service';
import { Document, listDocs, listDocss } from '../document.model';
import { User } from 'src/app/auth/auth.model';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-documents',
  templateUrl: './list-documents.component.html',
  styleUrls: ['./list-documents.component.css']
})
export class ListDocumentsComponent implements OnInit {

docs : Document[];
docsP : Document[]=[];
docsV : Document[]=[];
user : User;

private docssub: Subscription;
  
  passShow: boolean = true;
  vitShow: boolean = true;

  constructor(private docService: DocService ,private dash: DashboardComponent ) { }

  ngOnInit(): void {

  this.user = this.dash.user

  this.docService.listDocs(this.user.user_id).subscribe((data)=>{
    
    this.docs=data;
  
  for (let i = 0; i < Object.keys(data).length; i++)
  {
    
    if(data[i]['modelType']=='PASSPORT')
    {
      this.docsP.push(data[i]);
      
    }
    else if(data[i]['modelType']=='VITALE')
    {
      this.docsV.push(data[i]);
    }

  }
  
  });
    
  };



  

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
   
  passportShow()
  {
    this.passShow = !this.passShow;
  }

  vitaleShow()
  {
    this.vitShow = !this.vitShow;
  }

  
 

  }


