import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/auth/auth.model';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import Swal from 'sweetalert2';
import { Archive } from '../archive.model';
import { ArchiveService } from '../archive.service';



@Component({
  selector: 'app-archives-list',
  templateUrl: './archives-list.component.html',
  styleUrls: ['./archives-list.component.css']
})
export class ArchivesListComponent implements OnInit {

  archives : Archive[];
  user : User;
  archive :Archive;
  archiveChecker :boolean =false;
  closeResult = '';
  ArchiveForm : FormGroup;


  constructor(private archiveService: ArchiveService ,private dash: DashboardComponent,private router: Router,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.user = this.dash.user

    this.archiveService.listArchives(this.user.user_id).subscribe((data)=>{
      
      this.archives=data;
    });

    this.ArchiveForm = new FormGroup({
      'name' : new FormControl('',Validators.required),
      'description': new FormControl(''),
      'type': new FormControl('',[Validators.required]),
      'owner': new FormControl(this.user.user_id),
     });
  }

  onShow(event:any,archive_id:any){
   
    this.router.navigate(['dashboard/showArchive/'+`${archive_id}`])
      
  }

  showDetails(arcId)
  {
    
    this.archiveChecker = true;

    this.archiveService.detailArchive(arcId).subscribe((data)=>{
      
      this.archive=data;
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
      
        this.archiveChecker =false;
        this.archive = null;
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ),
        this.archiveService.deleteArchive(doc_id).subscribe(response => {
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

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  onCreate()
  {
    const formData = new FormData();
      formData.append('name',this.ArchiveForm.get('name').value)
      formData.append('type' , this.ArchiveForm.get('type').value)
      formData.append('description' , this.ArchiveForm.get('description').value);
      formData.append('owner' , this.user.user_id)

    console.log(formData);
    this.archiveService.newArchive(formData).subscribe((res)=>{
      this.ngOnInit();
      Swal.fire({
        title: 'Document has Beed Added',
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
     
    
  }
  

}
