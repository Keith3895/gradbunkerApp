import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { ItemDetailsPage } from '../item-details/item-details';



@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  items: any;
  gotData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http : Http) {
    this.http.get('https://erpdontdelete-mkb95.c9users.io/placementHead/listOfdrives/list').subscribe(data => {
         console.log("Got Data");
         data=data.json();
         
         this.gotData=this.items = data ;

         
            }, error => {
         console.log("Error with Data");
    });
  }


getItems(ev) {
    this.initializeItems();
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.cName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


  initializeItems(){

    this.items=this.gotData;
  }
  


  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
