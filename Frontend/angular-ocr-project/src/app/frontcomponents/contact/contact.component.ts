import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  
  
  contactform: FormGroup;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.contactform = new FormGroup({
      'first_name' : new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(3),Validators.pattern('[A-Za-z]+')]),
      'last_name': new FormControl('', [Validators.required,Validators.maxLength(15),Validators.minLength(3),Validators.pattern('[A-Za-z]+')] ),
      'email': new FormControl('', [Validators.required,Validators.email]),
      'phone_number': new FormControl('', [Validators.required,Validators.pattern('[0-9]+')]),
      'subject': new FormControl('', [Validators.required,Validators.maxLength(30),Validators.minLength(3)]),
      'message': new FormControl('', [Validators.required,Validators.maxLength(100),Validators.minLength(10)]),
 
     });
  }
  onSubmit()
  {
 const formData = new FormData;
 formData.append("first_name", this.contactform.get("first_name").value);
 formData.append("first_name", this.contactform.get("last_name").value);
 formData.append("first_name", this.contactform.get("email").value);
 formData.append("first_name", this.contactform.get("phone_number").value);
 formData.append("first_name", this.contactform.get("subject").value);
 formData.append("first_name", this.contactform.get("message").value);
 console.log(this.contactform.value);

  }



  

}
