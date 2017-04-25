import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {RedditService} from './services/reddit.service'
import {TicketsService} from './services/tickets.service'
import {CategoryService} from './services/category.service'
import {PlacesService} from './services/places.service'


import { Login } from '../pages/login/login';


@Component({
  templateUrl: 'app.html' ,
  providers: [RedditService , CategoryService , PlacesService , TicketsService] 
})
export class MyApp {
  rootPage:any = Login;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
