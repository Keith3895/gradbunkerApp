import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';


import { AddListingPage } from '../add-listing/add-listing';
import { ListPage } from '../list/list';
import { StudentListPage } from '../student-list/student-list';

@Component({
  selector: 'page-home-page',
  templateUrl: 'HomePage.html'
})
export class HomePage {
 
   @ViewChild('barCanvas') barCanvas;
    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas') lineCanvas;
    @ViewChild('polarCanvas') polarCanvas;
    @ViewChild('radarCanvas') radarCanvas;
 
    barChart: any;
    doughnutChart: any;
    lineChart: any;
    polar:any;
    radar:any;
    datas: any;
    companys:any;

    constructor(public navCtrl: NavController,public http:Http) {


        this.http.get('https://erpdontdelete-mkb95.c9users.io/admin/viewScrapedResults/a').subscribe(data => {
             data= data.json();
             this.calculateData(data);
                }, error => {
             console.log("Error with Data");
        });
        this.http.get('https://erpdontdelete-mkb95.c9users.io/placementHead/listOfdrives/home').subscribe(data => {
             data=data.json();
             this.companys = data ;
                }, error => {
             console.log("Error with Data");
        }); 
    }
 
    ionViewDidLoad() {
 
        
    }
    calculateData(data){
        this.datas=data;
        console.log(this.datas.fails);
        var charData = {
                    labels: ["First","Second","Third","Fourth","Fifth","Sixth","Seventh","Eight"],
                    datasets: [{
                        type: 'line',
                        label: 'failed',
                        borderColor: 'blue',
                        borderWidth: 2,
                        fill: false,
                        data: this.datas.fail
                    },
                    {
                        type: 'bar',
                        // data: {
                            // datasets: [{
                        label: 'passes by semester',
                        data: this.datas.pass,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    },
                    {
                    type: 'bar',
                    label: 'to be announced',
                    backgroundColor: "green",
                    data: this.datas.laterA
                }]
            };

        this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: 'bar',
                data: charData,
                options: {
                    title: {
                        display: true,
                        text: 'Chart.js Combo Bar Line Chart'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: true
                    }
                }
        });
 
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [
                        this.datas.Fail,
                        this.datas.Pass,
                        this.datas.later
                    ],
                     backgroundColor: [
                        'red',
                        'green',
                        'blue'
                    ],
                }],
                labels: [
                    "Fail",
                    "Pass",
                    "TO BE ANNOUNCED LATER"
                ]
            }
 
        });
 
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First this.dataset",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: this.datas.fail,
                        spanGaps: false,
                    }
                ]
            }
 
        });
         var config1 ={
            data: {
                datasets: [{
                    data: (<any>Object).values(this.datas.fails),// Object.values(this.datas.fails),
                    backgroundColor: [
                        'rgb(135, 189, 226)',
                        'rgb(255, 207, 159)',
                        'rgb(165, 223, 223)',
                        'rgb(255, 99, 132)',
                        'rgb(255, 177, 193)',
                        'rgb(75, 192, 192)',
                        'rgb(255, 205, 86)'
                    ],
                    label: 'My dataset' // for legend
                }],
                labels: this.datas.sevenCode
            },
            options: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: 'Fail\'s in 7th sem'
                },
                scale: {
                  ticks: {
                    beginAtZero: true
                  },
                  reverse: false
                },
                animation: {
                    animateRotate: false,
                    animateScale: true
                }
            }
        };
        this.polar = new Chart.PolarArea(this.polarCanvas.nativeElement,config1);
      
        for(let a in this.datas.sevenCode){
                this.datas.sevenCode[a]+= ', '+this.datas.sixCode[a];
            }
            var config2 ={
                type: 'radar',
                data: {
                    labels: this.datas.sevenCode,
                    datasets: [{
                        label: "seventh sem",
                        backgroundColor: 'rgba(255, 0, 0, 0.58)',
                        borderColor: 'red',
                        pointBackgroundColor: 'red',
                        data: (<any>Object).values(this.datas.marks)
                    },
                    {
                        label: "Sixth sem",
                        backgroundColor: 'rgb(215, 236, 251)',
                        borderColor: 'blue',
                        pointBackgroundColor: 'blue',
                        data: (<any>Object).values(this.datas.marks1)
                    }
                    ]
                },
                options: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Radar Chart'
                    },
                    scale: {
                      ticks: {
                        beginAtZero: true
                      }
                    }
                }
            };
        this.radar = new Chart(this.radarCanvas.nativeElement,config2);
    }

    openPage(destination){
        switch (destination) {
            case "AddListingPage":
                this.navCtrl.push(AddListingPage);
                break;
            case "ListPage":
                this.navCtrl.push(ListPage);
                break;
            case 'StudentListPage':
                this.navCtrl.push(StudentListPage);
                break;
            default:
                console.log('view shit');
                break;
        }
        
    }

}