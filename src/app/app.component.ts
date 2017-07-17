import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';
import { HomePage } from '../pages/HomePage/HomePage';
import { ListPage } from '../pages/list/list';
import { StudentListPage } from '../pages/student-list/student-list';
import { AddListingPage } from '../pages/add-listing/add-listing';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make Home the root (or first) page
  rootPage = LoginPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {


    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'HomePage', component: HomePage },
      { title: 'Scheduled Drives', component: ListPage },
      { title: 'Add Company listing', component: AddListingPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}







