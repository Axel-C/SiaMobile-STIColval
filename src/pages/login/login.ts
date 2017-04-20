import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'

})
export class Login {
TabsPage = TabsPage ;
mail ;
password ;
 
  constructor(public navCtrl: NavController , public alertCtrl: AlertController) {
    
  }
 login(){
      console.log(this.mail);
      console.log(this.password);
      if(this.mail != undefined && this.password != undefined){

          this.navCtrl.setRoot(TabsPage);

      }else{
        // alert('Invalide');
    let alert = this.alertCtrl.create({
      title: 'Identifiants incorects',
      subTitle: 'Votre adresse courriel et/ou votre mot de passe n\'est pas valide',
      buttons: ['OK']
    });
    alert.present();
  
      }
     // var login = document.getElementById('login').value ;
      
      
      
  };
  
}
