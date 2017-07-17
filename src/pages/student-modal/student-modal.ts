import { Component } from '@angular/core';
import { ModalController, NavParams, NavController, Platform, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/Rx'; 
/**
 * Generated class for the StudentModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-student-modal',
  templateUrl: 'student-modal.html',
})
export class StudentModal {

    character;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public http : Http
  ) {
    this.http.get('https://erpdontdelete-mkb95.c9users.io/student/mobile/'+this.params.get('item')).subscribe(data => {
         console.log("Got Data");
         data=data.json();
         
         	
         	this.character = data;
         	console.log(this.character);
            }, error => {
         console.log("Error with Data");
    });

    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentModal');
  }

}
