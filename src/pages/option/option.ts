import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Login } from '../login/login';
import { App } from "ionic-angular";

/*
  Generated class for the Option page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-option',
  templateUrl: 'option.html'
})
export class OptionPage {
  loginPage = Login ;

  constructor(private app : App , public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionPage');
  }

  login(){
    this.app.getRootNav().setRoot(Login);
    
  }

}
