import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/auth.model';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import Swal from 'sweetalert2';
import { DocService } from '../document.service';
import { Document, listDocs, listDocss, PassportDoc, PassportModel, VitaleDoc, VitaleModel } from '../document.model';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';


@Component({
  selector: 'app-docs-tables',
  templateUrl: './docs-tables.component.html',
  styleUrls: ['./docs-tables.component.css']
})


export class DocsTablesComponent implements OnInit {

  darkmode =false;
  docs : Document[];
  docsP : PassportDoc[] = [];
  docsV : VitaleDoc[] = [];
  doc :Document
  user : User;
  Passport: PassportDoc;
  vitale: VitaleDoc;
  tableType='PASSPORT';
  p: number = 1;
  public searchFilter: any = '';
  term: string;



  dtOptions: any = {};

  private docssub: Subscription;
  show_data =false;

  constructor(private docService: DocService ,private dash: DashboardComponent ) { }

  ngOnInit(): void {

  this.user = this.dash.user

  this.docService.listDocs(this.user.user_id).subscribe((data)=>{
    
    
    for (let i = 0; i < Object.keys(data).length; i++)
    {
      
      if(data[i]['modelType']=='PASSPORT')
      {
      this.docService.detailExt(data[i]['data_id']).subscribe((datap:PassportModel)=>{
        data[i]['dataP']=datap;
        
      });}
      else if(data[i]['modelType']=='VITALE')
      {
      this.docService.detailExtVitale(data[i]['vitale_data_id']).subscribe((datav:VitaleModel)=>{
        data[i]['dataV']=datav;
      });

    }
    };


    this.docs=data;

    console.log(this.docs);
    
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
   
  showdata()
  {
    if(!this.show_data)
    this.show_data = true;
    else
    this.show_data = false;
  }

  getDataP(item:Document)
  {
    if(item.modelType=='PASSPORT')
      {
      this.docService.detailExt(item.data).subscribe((data:PassportModel)=>{
        item.dataP=data;
        
      });}
      else if(item.modelType=='VITALE')
      {
      this.docService.detailExtVitale(item.vitale_data).subscribe((data:VitaleModel)=>{
        item.dataV=data;
      });

    }
  }

  tableTypeC(type:string){

    this.tableType=type;
    this.p=1;
    this.term='';
    
  }
  date = new Date();

   optionsP = { 
    title: this.tableType+' '+(this.date).toString(),
    showLabels :true,
    headers: ["Id","Title","Description","Creation Date","ModelType", "Nationality","First Name", "Last Name","Date Of Birth","Sex","Expiration Date"]
  };

  onCSVPassport()
  {
    for (let i = 0; i < Object.keys(this.docs).length; i++)
    {
      
      if(this.docs[i]['modelType']=='PASSPORT')
      {
        this.Passport = new PassportDoc(
          
            this.docs[i]['id'],
            this.docs[i]['title'],
            this.docs[i]['description'],
            (this.docs[i]['creationDate']).toString(),
            this.docs[i]['modelType'],
            
            
            
            this.docs[i].dataP.nationality,
            this.docs[i].dataP.names,
            this.docs[i].dataP.surname,
            this.docs[i].dataP.date_of_birth,
            this.docs[i].dataP.sex,
            this.docs[i].dataP.expiration_date,
           
            
            );
        
        
        
        /*  this.docs[i]['id'],
        this.Passport.creationDate= (this.docs[i]['creationDate']).toISOString(),
        this.Passport.owner=this.user.email,
        this.Passport.modelType=this.docs[i]['modelType'],
        this.Passport.title=this.docs[i]['title'],
        this.Passport.description=this.docs[i]['description'],

        this.Passport.names=this.docs[i]['names'],
        this.Passport.surname=this.docs[i]['surname'],
        this.Passport.nationality=this.docs[i]['nationality'],
        this.Passport.date_of_birth=this.docs[i]['date_of_birth'],
        this.Passport.expiration_date=this.docs[i]['expiration_date'],
        this.Passport.sex=this.docs[i]['sex'],
        this.Passport.type=this.docs[i]['type']*/
        
     
       
        
        this.docsP.push(this.Passport);
      }
    }

    new ngxCsv(this.docsP,this.tableType+' '+(this.date).toString(),this.optionsP);
  }

  exportExcelP() {

    for (let i = 0; i < Object.keys(this.docs).length; i++)
    {
      
      if(this.docs[i]['modelType']=='PASSPORT')
      {
        this.Passport = new PassportDoc(
          
            this.docs[i]['id'],
            this.docs[i]['title'],
            this.docs[i]['description'],
            (this.docs[i]['creationDate']).toString(),
            this.docs[i]['modelType'],
            
            
            
            this.docs[i].dataP.nationality,
            this.docs[i].dataP.names,
            this.docs[i].dataP.surname,
            this.docs[i].dataP.date_of_birth,
            this.docs[i].dataP.sex,
            this.docs[i].dataP.expiration_date,
           
            
            );
        
        this.docsP.push(this.Passport);
      }
    }
 
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('PassportData');

    
    worksheet.columns = [
      { header: 'Id', key: 'id', width: 5 },
      { header: 'Title', key: 'title', width: 15 },
      { header: 'Description', key: 'description', width: 30 },
      { header: 'Ceation Date', key: 'creationDate', width: 15 },
      { header: 'Model Type', key: 'modelType', width: 12 },
      { header: 'First Name', key: 'names', width: 20 },
      { header: 'Last Name', key: 'surname', width: 20 },
      { header: 'Nationality', key: 'nationality', width: 5 },
      { header: 'Date of Birth', key: 'date_of_birth', width: 15 },
      { header: 'Expiration Date', key: 'expiration_date', width: 15 },
      { header: 'Gender', key: 'sex', width: 5 },
      
    ];

    this.docsP.forEach(e => {
      worksheet.addRow({id: e.id, title: e.title, description:e.description, creationDate:e.creationDate, modelType:e.modelType, names:e.names, surname:e.surname , nationality:e.nationality , date_of_birth:e.date_of_birth , expiration_date:e.expiration_date , sex :e.sex  },"n");
    });
   
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, this.tableType+''+this.date.toString()+'.xlsx');
    })
   
  }



  
 
  optionsV = { 
    title: this.tableType+' '+(this.date).toString(),
    showLabels :true,
    headers: ["Id","Title","Description","Creation Date","ModelType", "Full Name","Emise Date", "Gender","Date Of Birth","Security Key"]
  };


  onCSVVitale()
  {
    for (let i = 0; i < Object.keys(this.docs).length; i++)
    {
      
      if(this.docs[i]['modelType']=='VITALE')
      {
        this.vitale = new VitaleDoc(
          
            this.docs[i]['id'],
            this.docs[i]['title'],
            this.docs[i]['description'],
            (this.docs[i]['creationDate']).toString(),
            this.docs[i]['modelType'],
            
            
            
            this.docs[i].dataV.full_name,
            this.docs[i].dataV.emise_date,
            this.docs[i].dataV.gender,
            this.docs[i].dataV.date_of_birth,
            this.docs[i].dataV.cle_de_securite,
           
            
            );
        
         
        this.docsV.push(this.vitale);
      }
    }

    new ngxCsv(this.docsV, this.tableType+' '+(this.date).toString(),this.optionsV);
  }

  exportExcelV() {

    for (let i = 0; i < Object.keys(this.docs).length; i++)
    {
      
      if(this.docs[i]['modelType']=='VITALE')
      {
        this.vitale = new VitaleDoc(
          
            this.docs[i]['id'],
            this.docs[i]['title'],
            this.docs[i]['description'],
            ((this.docs[i]['creationDate'])).toString(),
            this.docs[i]['modelType'],
            this.docs[i].dataV.full_name,
            this.docs[i].dataV.emise_date,
            this.docs[i].dataV.gender,
            this.docs[i].dataV.date_of_birth,
            this.docs[i].dataV.cle_de_securite,
           
            
            );
        
        this.docsV.push(this.vitale);
      }
    }
 
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('VitaleData');

    
    worksheet.columns = [
      { header: 'Id', key: 'id', width: 5 },
      { header: 'Title', key: 'title', width: 15 },
      { header: 'Description', key: 'description', width: 30 },
      { header: 'Ceation Date', key: 'creationDate', width: 15 },
      { header: 'Model Type', key: 'modelType', width: 12 },
      { header: 'Full Name', key: 'full_name', width: 20 },
      { header: 'Gender', key: 'gender', width: 10 },
      { header: 'Emise Date', key: 'emise_date', width: 25 },
      { header: 'Date of Birth', key: 'date_of_birth', width: 15 },
      { header: 'Security Key ', key: 'cle_de_securite', width: 7 },
      
    ];

    this.docsV.forEach(e => {
      worksheet.addRow({id: e.id, title: e.title, description:e.description, creationDate:e.creationDate ,modelType:e.modelType, full_name:e.full_name, gender:e.gender , emise_date:e.emise_date , date_of_birth:e.date_of_birth , cle_de_securite:e.cle_de_securite ,  },"n");
    });
   
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, this.tableType+''+this.date.toString()+'.xlsx');
    })
   
  }


  randomize(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


  


  }
