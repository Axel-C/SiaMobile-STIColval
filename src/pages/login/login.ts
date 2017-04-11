import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'

})
export class Login {
  homepage = HomePage ;

 
  constructor(public navCtrl: NavController) {
    
  }
 login(){
      console.log('test');
      this.navCtrl.setRoot(HomePage);
  };
  
}
