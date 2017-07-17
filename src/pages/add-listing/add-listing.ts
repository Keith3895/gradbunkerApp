import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController   } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { HomePage } from '../HomePage/HomePage';
/**
 * Generated class for the AddListingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-listing',
  templateUrl: 'add-listing.html',
})
export class AddListingPage {

	 private addlisting : FormGroup;

	 @ViewChild('slider') slider;
	 departments = ['IS','CS', 'Mech','EC','EEE','MCA','CIVIL'];
	 posts:any; 

	  logForm(){
	    let loader = this.loadingCtrl.create({
	      content: "",
	      spinner:'dots'
	    });
	    loader.present();
  		let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
  		this.posts=this.addlisting.value;
  		let link = 'https://erpdontdelete-mkb95.c9users.io/placementHead/addNewPlacementMobile';
  		this.http.post(link, this.posts,options)
        .subscribe(data => {
            this.posts.response = data;
            if(this.posts.response._body === 'yes')
              {
                loader.dismiss();
            	this.navCtrl.setRoot(HomePage);
              }
            	else if(this.posts.response._body ==='no')
              {
                let toast = this.toastCtrl.create({
                  message: 'Incorrect credentials',
                  duration: 3000
                });
                toast.present();
                loader.dismiss();
            		console.log(":-(");
              }


        }, error => {
            console.log("Oooops!");
        });
	    console.log(this.addlisting.value);
	  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,private formBuilder: FormBuilder,public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  	let Frargs ={
	      cName: ['', Validators.required],
	      Package:['',Validators.required],
	      jobLocation:['',Validators.required],
	      skills: [''],
	      designation: [''],
	      driveLocation:['',Validators.required],
	      tenth:[''],
	      twelve:[''],
	      engg:[''],
	      date:['',Validators.required],
	      time:['',Validators.required]
	    };
	

	    for(let i in this.departments){
	    	Frargs[this.departments[i]]=[true];
	    }
	    console.log(Frargs);
  	this.addlisting = this.formBuilder.group(Frargs);
  	console.log(this.slider);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddListingPage');
  }

}
