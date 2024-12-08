import { Component, OnInit } from '@angular/core';
import { ChartData, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, MultiDataSet, SingleDataSet } from 'ng2-charts';
import { User } from '../auth/auth.model';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DocService } from '../DocumentComponents/document.service';



@Component({
  selector: 'app-main-dash',
  templateUrl: './main-dash.component.html',
  styleUrls: ['./main-dash.component.css']
})
export class MainDashComponent implements OnInit {

  
  user : User;
  dataL =[];
  dataPie=[];
  dataDough=[];
  dataV=[];
  dataT=[];
  dataD=[];



  //line Chart

  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];
  lineChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
  }
  };
  lineChartColors: Color[] = [
    {
      borderColor: '#8038eb',
      backgroundColor: 'rgba(128, 56, 235,0.10)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType : ChartType = 'line';


  //pie Chart

  public pieChartOptions: ChartOptions = {
    responsive: true,
    
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Array < any > = [{
    backgroundColor: ['#3432a8', '#2f8d94', 'rgba(148,159,177,0.2)'],
 }];

 //doughnutChart
 doughnutChartOptions: ChartOptions = {
  responsive: true,
  
};
 doughnutChartLabels: Label[] =[];
 doughnutChartData: MultiDataSet = [];
 doughnutChartType: ChartType = 'doughnut';
 doughnutChartColors: Array < any > = [{
 backgroundColor: ['#4278f5', '#f542d4', 'rgba(148,159,177,0.2)'],
}];

//barChart

barChartOptions: ChartOptions = {
  responsive: true,
  scales: {
    yAxes: [{
        ticks: {
            beginAtZero: true
        }
    }]
}
};
barChartLabels: Label[] =[];
barChartType: ChartType = 'bar';
barChartLegend = true;
barChartPlugins = [];
barChartData: ChartDataSets[] = [];
barChartColors: Array < any > = [{
  backgroundColor: ['#f542d4','#4278f5',  'rgba(148,159,177,0.2)'],
 }];

   // PolarArea
    polarAreaChartLabels: Label[] = [];
    polarAreaChartData: SingleDataSet = [];
    polarAreaLegend = true;
   myColors = [{ backgroundColor: ["#cb4b4b", "#edc240", "#afd8f8"] }];
    polarAreaChartType: ChartType = 'polarArea';

  

    //line Archive Chart

  lineArcChartData: ChartDataSets[] = [];
  lineArcChartLabels: Label[] = [];
  lineArcChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
  }
  };
  lineArcChartColors: Color[] = [
    {
      borderColor: '#3850eb',
      backgroundColor: 'rgba(56, 80, 235,0.10)',
    },
  ];
  lineArcChartLegend = true;
  lineArcChartPlugins = [];
  lineArcChartType : ChartType = 'line';

 
  
  
  constructor(private docService: DocService,private dash: DashboardComponent) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }


 
  ngOnInit(): void {
    this.user = this.dash.user;
 //line Chart

    this.docService.monthList(this.user.user_id).subscribe((datay:any)=>{
      
    
      this.dataL=Object.values(datay)

      this.lineChartData =[
        { data: this.dataL, label: 'Extractions By Month' },
      ];
      this.lineChartLabels=Object.keys(datay);
    });
 
  //Pie Chart

    this.docService.typeChart(this.user.user_id).subscribe((dataw:any)=>{
      
      this.dataPie=Object.values(dataw);
      
      this.pieChartLabels=Object.keys(dataw);
      this.pieChartData =this.dataPie;
    });


    //doughnut Chart

    this.docService.PassGenderChart(this.user.user_id).subscribe((datap:any)=>{
      
      this.dataDough=Object.values(datap);
      
      this.doughnutChartLabels=Object.keys(datap);
      this.doughnutChartData =this.dataDough;
    });



     //Bar Chart

     this.docService.VitaleGenderChart(this.user.user_id).subscribe((datav:any)=>{
      
    
      this.dataV=Object.values(datav)

      this.barChartData =[
        { data: this.dataV, label: 'Vital Cards Genders ' },
      ];
      this.barChartLabels=Object.keys(datav);
    });

    //Polar Chart

     this.docService.ArchiveTypeChart(this.user.user_id).subscribe((datat:any)=>{
      
      this.polarAreaChartLabels=Object.keys(datat);
      this.dataT=Object.values(datat)

      this.polarAreaChartData = this.dataT
      
      
    });


    //line  Archive Chart

    this.docService.ArchiveDateChart(this.user.user_id).subscribe((datad:any)=>{
      
    
      this.dataD=Object.values(datad)

      this.lineArcChartData =[
        { data: this.dataD, label: 'Extractions By Month' },
      ];
      this.lineArcChartLabels=Object.keys(datad);
    });




  }



}
