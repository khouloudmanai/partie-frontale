import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/auth.model';
import { AuthService } from 'src/app/auth/auth.service';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import Swal from 'sweetalert2';
import { createDoc, Document, PassportModel, Product, ReceiptModel, VitaleModel } from '../document.model';
import { DocService } from '../document.service';





@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.css']
})
export class CreateDocumentComponent implements OnInit {
 
  createForm: FormGroup;
  verifyForm: FormGroup;
  verifyVitaleForm: FormGroup;
  verifyReceiptForm: FormGroup;
  error:string=null;
  success:string=null;
  user: User;
  userSub: Subscription;
  modelTypes = ["VITALE","PASSPORT","RECEIPT"];
  selectedValue = "Select the Document Type";
  url: any = '../../../assets/img/imgback.png'; //Angular 11, for stricter type
	msg = "";
  img :string='';
  imgf :File;
  DJANGO_SERVER = 'http://127.0.0.1:8000'
  response;
  imageURL;
  extract =false;
  extractVitale =false;

  pass: PassportModel;
  private passSub: Subscription;
  doct:Document;
  data_ref:string;
  full_ref :string;
  vitale:VitaleModel;
  receipt:ReceiptModel;
  extractReceipt: boolean = false;
  products:Product[]


  constructor(private docService: DocService ,private dash: DashboardComponent ,private formBuilder: FormBuilder) { }

  ngOnInit(){
    this.user = this.dash.user ;
    this.createForm = this.formBuilder.group({
      title: ['', [Validators.minLength(3)]],
      description: ['', [Validators.minLength(10)]],
      modelType: ['Select the Document Type', [Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
      owner: [this.user.email],
      docImage: ['',Validators.required],
      img: [null],

    });
    this.verifyForm = new FormGroup({
      'names' : new FormControl(''),
      'surname': new FormControl(''),
      'nationality': new FormControl(''),
      'type': new FormControl(''),
      'sex': new FormControl(''),
      'date_of_birth': new FormControl(''),
      'expiration_date': new FormControl(''),
     });

     this.verifyVitaleForm = new FormGroup({
      'full_name' : new FormControl(''),
      'emise_date': new FormControl(''),
      'gender': new FormControl(''),
      'date_of_birth': new FormControl(''),
      'cle_de_securite': new FormControl(''),
     });

     this.verifyReceiptForm = new FormGroup({
      'Merchant_Name' : new FormControl(''),
      'Merchant_Address': new FormControl(''),
      'Merchant_Phone': new FormControl(''),
      'Receipt_Number': new FormControl(''),
      'Total_Amount': new FormControl(''),
      'Tax_Amount': new FormControl(''),
      'productList': new FormControl(''),
     });

    
  }

  onCreate(){
    console.log(this.createForm)
    
    const formData = new FormData();
    formData.append('title',this.createForm.get('title').value)
    formData.append('description',this.createForm.get('description').value)
    formData.append('modelType',this.createForm.get('modelType').value)
    formData.append('owner',this.user.user_id)
    formData.append('file', this.createForm.get('docImage').value)

    this.docService.upload(formData).subscribe(
      (res) => {
        Swal.fire({
          title: 'Document has Beed Added',
          text: "You won't be able to revert this!",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
        })
        this.response = res;
        this.imageURL = `${this.DJANGO_SERVER}${res.file}`;
        console.log(res);
        console.log(this.imageURL);
      },
      (err) => {  
        console.log(err);
      }
    );
  }
 
  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];

    this.createForm.patchValue({
      img: file
    });

    this.createForm.get('img').updateValueAndValidity()

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
    this.createForm.get('docImage').setValue(file);

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result;
      //this.img = ("http://127.0.0.1:8000/media/images/" + event.target.files[0].name);
    
		}

	}

  OnExtract()
  {
    console.log(this.createForm)
    this.data_ref=this.generateString(20)
    const formData = new FormData();
    formData.append('modelType',this.createForm.get('modelType').value)
    formData.append('file', this.createForm.get('docImage').value)
    formData.append('title',this.createForm.get('title').value)
    formData.append('description',this.createForm.get('description').value)
    formData.append('owner',this.user.user_id)
    this.full_ref=(this.data_ref+''+this.user.username).replace(/\s/g, "");
    formData.append('ref',this.full_ref)

    this.docService.Extract(formData).subscribe(
      (res) => {
      if(this.createForm.get('modelType').value == 'PASSPORT')
      {
        Swal.fire({
          title: 'Your Passport  has Beed Extracted',
          text: "You won't be able to revert this!",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
        })
        this.pass = res;
        this.verifyForm.patchValue({
          names: this.pass.names,
          surname: this.pass.surname,
          nationality: this.pass.nationality,
          type: this.pass.type,
          sex: this.pass.sex,
          date_of_birth: this.pass.date_of_birth,
          expiration_date: this.pass.expiration_date,
        });
        this.extract=true;
        this.imageURL = `${this.DJANGO_SERVER}${res.file}`;
        console.log(res);
        console.log(this.imageURL);
      }

      else if(this.createForm.get('modelType').value == 'VITALE'){
        Swal.fire({
          title: 'Your Vitale Card  has Beed Extracted',
          text: "You won't be able to revert this!",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
        })
        this.vitale = res;
        this.verifyVitaleForm.patchValue({
          full_name: this.vitale.full_name,
          emise_date: this.vitale.emise_date,
          gender: this.vitale.gender,
          cle_de_securite: this.vitale.cle_de_securite,
          date_of_birth: this.vitale.date_of_birth,
        });
        this.extractVitale=true;
        this.imageURL = `${this.DJANGO_SERVER}${res.file}`;
        console.log(res);
        console.log(this.imageURL);
      }

      else if(this.createForm.get('modelType').value == 'RECEIPT')
      {
        Swal.fire({
          title: 'Your Vitale Card  has Beed Extracted',
          text: "You won't be able to revert this!",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
        })
        this.receipt = res;
        this.verifyReceiptForm.patchValue({
          Merchant_Name: this.receipt.Merchant_Name,
          Merchant_Address: this.receipt.Merchant_Address,
          Merchant_Phone: this.receipt.Merchant_Phone,
          Receipt_Number: this.receipt.Receipt_Number,
          Tax_Amount: this.receipt.Tax_Amount,
          Total_Amount: this.receipt.Total_Amount,
          productList: this.receipt.productList
        });
        
        this.extractReceipt=true;
        this.imageURL = `${this.DJANGO_SERVER}${res.file}`;
        console.log(res);
        console.log(this.imageURL);
      }
    
    }
      ,
      (err) => {  
        console.log(err);
      }
    );

  }
 
 generateString  (length:number) :string{

    let characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }


 onVerify(){
  console.log(this.verifyForm)
  
  const formData = new FormData();
  formData.append('names',this.verifyForm.get('names').value)
  formData.append('surname',this.verifyForm.get('surname').value)
  formData.append('nationality',this.verifyForm.get('nationality').value)
  formData.append('type',this.verifyForm.get('type').value)
  formData.append('sex',this.verifyForm.get('sex').value)
  formData.append('date_of_birth',this.verifyForm.get('date_of_birth').value)
  formData.append('expiration_date',this.verifyForm.get('expiration_date').value)

  this.docService.verifyData(formData,this.full_ref).subscribe(
    (res) => {
      Swal.fire({
        title: 'Data has Been Saved',
        text: "You won't be able to revert this!",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
      })
      this.response = res;
      this.imageURL = `${this.DJANGO_SERVER}${res.file}`;
      console.log(res);
      console.log(this.imageURL);
      this.pass = null;
      this.url ='../../../assets/img/imgback.png';
      this.ngOnInit();
    },
    (err) => {  
      console.log(err);
    }
  );
}


onVerifyVitale(){
  console.log(this.verifyVitaleForm)
  
  const formData = new FormData();
  formData.append('full_name',this.verifyVitaleForm.get('full_name').value)
  formData.append('emise_date',this.verifyVitaleForm.get('emise_date').value)
  formData.append('gender',this.verifyVitaleForm.get('gender').value)
  formData.append('cle_de_securite',this.verifyVitaleForm.get('cle_de_securite').value)
  formData.append('date_of_birth',this.verifyVitaleForm.get('date_of_birth').value)
  

  this.docService.verifyDataVitale(formData,this.full_ref).subscribe(
    (res) => {
      Swal.fire({
        title: 'Vitale Data has Been Saved',
        text: "You won't be able to revert this!",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
      })
      this.response = res;
      this.imageURL = `${this.DJANGO_SERVER}${res.file}`;
      console.log(res);
      console.log(this.imageURL);
      this.vitale = null;
      this.url ='../../../assets/img/imgback.png';
      this.ngOnInit();

    },
    (err) => {  
      console.log(err);
    }
  );
}


onVerifyReceipt(){
  console.log(this.verifyForm)
  
  const formData = new FormData();
  formData.append('Merchant_Name',this.verifyReceiptForm.get('Merchant_Name').value)
  formData.append('Merchant_Address',this.verifyReceiptForm.get('Merchant_Address').value)
  formData.append('Merchant_Phone',this.verifyReceiptForm.get('Merchant_Phone').value)
  formData.append('Receipt_Number',this.verifyReceiptForm.get('Receipt_Number').value)
  formData.append('Tax_Amount',this.verifyReceiptForm.get('Tax_Amount').value)
  formData.append('Total_Amount',this.verifyReceiptForm.get('Total_Amount').value)
  formData.append('productList',this.verifyReceiptForm.get('productList').value)

  this.docService.verifyDataReceipt(formData,this.full_ref).subscribe(
    (res) => {
      Swal.fire({
        title: 'Data has Been Saved',
        text: "You won't be able to revert this!",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
      })
      this.response = res;
      this.imageURL = `${this.DJANGO_SERVER}${res.file}`;
      console.log(res);
      console.log(this.imageURL);
      this.pass = null;
      this.url ='../../../assets/img/imgback.png';
      this.ngOnInit();
    },
    (err) => {  
      console.log(err);
    }
  );
}

  
}
