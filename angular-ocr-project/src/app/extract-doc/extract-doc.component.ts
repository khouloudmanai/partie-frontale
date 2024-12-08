import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DocService } from '../DocumentComponents/document.service';

@Component({
  selector: 'app-extract-doc',
  templateUrl: './extract-doc.component.html',
  styleUrls: ['./extract-doc.component.css']
})
export class ExtractDocComponent implements OnInit {

   
  imageSrc: string = '';
  url : any;
  msg: string ='';
  /*------------------------------------------
  --------------------------------------------
  Declare form
  --------------------------------------------
  --------------------------------------------*/
  myForm = new FormGroup({
  });
  text: any;

  constructor(private http: HttpClient, private docService:DocService) { }

  ngOnInit(): void {
    
    this.myForm = new FormGroup({
      'name' : new FormControl('',Validators.required),
      'file':new FormControl(Validators.required),
      'img': new FormControl(),
    });
  
  }

  

 /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.myForm.controls;
  }
  
  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];

    this.myForm.patchValue({
      img: file
    });

    

    this.myForm.get('img').updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.url = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

 
  
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    
    const formData = new FormData();
    formData.append('file',this.myForm.get('img').value);
    formData.append('name' , this.myForm.get('file').value);
    let data=
    {
      'file' : this.myForm.get('img').value,
      'name' : this.myForm.get('name').value
    }
    
    console.log(data);

    console.log(this.myForm.get('file').value);
    console.log(this.myForm.get('img').value);

    this.docService.ExtractPDF(formData).subscribe((res)=>{
      Swal.fire({
        title: 'Document has Beed Added',
        text: "You won't be able to revert this!",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
      })
      this.text=res;
      console.log(res);
    },
    (err) => {  
      console.log(err);
    }
  );
   
  }

}
