import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../auth/auth.model';
import { AuthService } from '../auth/auth.service';
import { DashboardComponent } from '../dashboard/dashboard.component';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent  implements OnInit,OnDestroy {
 age:number;

 private userSub: Subscription;
 private userSubb: Subscription;
 userd: any = {};
 user: User;
 user_id;
 docNums;
 docPerc;
 archiveNum;
 archivePerc;
 archivePercCheck:boolean=true;
 docPercCheck:boolean=true;
 today = new Date();

 editForm : FormGroup = new FormGroup({});
 url : any;
msg: string ='';
  todayx: any;

  constructor(private authService: AuthService) { }

 

  

  ngOnInit(): void {


  this.userSub = this.authService.user.subscribe((data)=>{
      this.user=data;
      console.log('ssssssssssssssss');
      console.log(this.user)
    
  });

  this.user_id=this.user.user_id;
 

   this.userSubb  = this.authService.getUser(this.user_id).subscribe((datax)=>{
    this.userd =datax;
    this.user =this.userd;
    console.log('uuuuuuuuuuuuuuuuu');
    console.log(this.userd)
  });

  this.authService.ArchiveNumber(this.user_id).subscribe((datay)=>{
    this.archiveNum =datay['sum'];
    this.archivePerc =datay['percentage'];
    console.log('uuuuuuuuuuuuuuuuu');
    console.log(this.archiveNum);
    if(parseFloat(datay['percentage'])<0)
      this.archivePercCheck = !this.archivePercCheck
  });
  
  this.authService.docsNumber(this.user_id).subscribe((datad)=>{
    this.docNums =datad['sum'];
    this.docPerc =datad['percentage'];
    console.log('uuuuuuuuuuuuuuuuu');
    console.log(this.docNums);
    if(parseFloat(datad['percentage'])<0)
      this.docPercCheck = !this.docPercCheck

  });

    this.editForm = new FormGroup({
      'username' : new FormControl(this.userd.username,Validators.required),
      'email': new FormControl({value: this.userd.email, disabled: true},[Validators.required,Validators.email]),
      'name': new FormControl(this.userd.name,[Validators.required]),
      'birthday': new FormControl(this.userd.birthday,Validators.required),
      'city':new FormControl(this.userd.city),
      'country':new FormControl(this.userd.country),
      'address':new FormControl(this.userd.address),
      'postalcode':new FormControl(this.userd.postalcode,Validators.pattern('^[1-9]+[0-9]*$')),
      'bio':new FormControl(this.userd.bio,Validators.minLength(10)),
      'file':new FormControl(''),
      'img': new FormControl(),
     });
    

    
      
      let year = this.today.getFullYear() - 18;
      let month = this.today.getMonth();
      let day = this.today.getDay();
      console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
      console.log(this.today);
      this.today.setMonth(month);
      this.today.setFullYear(year);
      this.today.setDate(day);
      console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
      console.log(this.today.toJSON().split('T')[0]);
      this.todayx =this.today.toJSON().split('T')[0];
  
      
    
   
  }

  onEditUser()
  {
    const formData = new FormData();
      formData.append('username',this.editForm.get('username').value);
      formData.append('email' , this.editForm.get('email').value);
      formData.append('name' , this.editForm.get('name').value);
      formData.append('birthday' , this.editForm.get('birthday').value);
      formData.append('city' , this.editForm.get('city').value);
      formData.append('country' , this.editForm.get('country').value);
      formData.append('address' , this.editForm.get('address').value);
      formData.append('postalcode' , this.editForm.get('postalcode').value);
      formData.append('bio' , this.editForm.get('bio').value);
      if(!this.url){
      }
      else
      {
      formData.append('file',this.editForm.get('file').value)
      }
      
    
    this.authService.editProfile(formData,this.user_id).subscribe((res)=>{
      this.ngOnInit();
      this.user=this.userd;
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


  imagePreviewEdit(e) {
    const file = (e.target as HTMLInputElement).files[0];

    this.editForm.patchValue({
      img: file
    });

    this.editForm.get('img').updateValueAndValidity()

    
    
      this.url = this.userd.file
    
  
  }


  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];

    this.editForm.patchValue({
      img: file
    });

    this.editForm.get('img').updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.url = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  //selectFile(event) { //Angular 8
	selectFile(event :any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
    const file = event.target.files[0];
    this.editForm.get('file').setValue(file);

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result;
      //this.img = ("http://127.0.0.1:8000/media/images/" + event.target.files[0].name);
    
		}

	}

  ngOnDestroy(){
    this.userSub.unsubscribe();
    this.userSubb.unsubscribe();
  }


}