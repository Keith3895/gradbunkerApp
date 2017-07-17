import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController  } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../HomePage/HomePage';
import 'rxjs/Rx';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	posts:any;
	// postVal:any;
	private signin:FormGroup;
  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public http:Http,private formBuilder: FormBuilder, public loadingCtrl: LoadingController) {

  	this.signin = this.formBuilder.group({
  		email:['', Validators.required],
  		password:['', Validators.required]
  	});




	//  this.http.get('http://www.festmamu.tk/stage/list').subscribe(data => {
	//  console.log("Got Data");
	//  this.posts = data;
	// }, error => {
	//  console.log("Error with Data");
	// });



  }
  
  logForm(){
    let loader = this.loadingCtrl.create({
      content: "",
      spinner:'dots'
    });
    loader.present();
  	let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
  	this.posts=this.signin.value;
  	let link = 'https://erpdontdelete-mkb95.c9users.io/login/app/admin';
  	this.http.post(link, this.posts,options)
        .subscribe(data => {
            this.posts.response = data.json();
            // if(this.posts.response != null ){
            	if(this.posts.response[0] === 'yes')
              {
                loader.dismiss();
            		this.navCtrl.setRoot(HomePage);
              }
            	else if(this.posts.response[0] ==='no')
              {
                let toast = this.toastCtrl.create({
                  message: 'Incorrect credentials',
                  duration: 3000
                });
                toast.present();
                loader.dismiss();
              }

        	
        }, error => {
            console.log("Oooops!");
        });


  }
  changePage(){
  	this.navCtrl.push(HomePage);
  }
  ionViewDidLoad() {
  	// this.navCtrl.setRoot(HomePage);
    console.log('ionViewDidLoad LoginPage');
  }

}
