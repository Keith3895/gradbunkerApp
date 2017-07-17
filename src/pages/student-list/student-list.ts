import { Component } from '@angular/core';
import { ModalController, NavParams, NavController, Platform, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/Rx'; 
import { StudentModal } from '../student-modal/student-modal';
/**
 * Generated class for the StudentListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-student-list',
  templateUrl: 'student-list.html',
})
export class StudentListPage {
  gotData:any;
  items:any;
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public http : Http) {
    this.http.get('https://erpdontdelete-mkb95.c9users.io/admin/user_list/mobile').subscribe(data => {
         console.log("Got Data");
         data=data.json();
         
         this.gotData=this.items = data;
        
         
            }, error => {
         console.log("Error with Data");
    });
  }


getItems(ev) {
    this.initializeItems();
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.author.firstName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


  initializeItems(){

    this.items=this.gotData;
  }
  


    openModal(characterNum,item) {
    	console.log(item._id);
    let modal = this.modalCtrl.create(StudentModal,{item : item._id} );
    modal.present();
  }
}


