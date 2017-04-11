import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'

})
export class Login {
TabsPage = TabsPage ;

 
  constructor(public navCtrl: NavController) {
    
  }
 login(){
      console.log('test');
      this.navCtrl.setRoot(TabsPage);
  };
  
}
