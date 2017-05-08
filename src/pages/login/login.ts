import { Component } from '@angular/core';

import { NavController , Loading } from 'ionic-angular';
import { AlertController, LoadingController } from 'ionic-angular';
import { LoginService} from '../../app/services/login.service';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'

})
export class Login {
TabsPage = TabsPage ;
id = "08005";
SiaId :any ;
password ;

 
  constructor(public navCtrl: NavController , public alertCtrl: AlertController  , private loginService:LoginService , public loadingController: LoadingController) {
    
  }

  
 login(){
   let loader = this.loadingController.create({
      content: "Authentification en cours ..." 
    });   
    loader.present();
    this.loginService.getSiaId(this.id).subscribe(response => {
      
      this.loginService.login = response.id ;
     this.loginService.password = this.password ; 
     this.navCtrl.setRoot(TabsPage);
     loader.dismiss();
    } ,
    err => {
      alert("Erreur : Impossible de se connecter \n Veuillez réessayer plus tard ")
      loader.dismiss();
    }
    );
    console.log("Sia" + this.SiaId);
     
     
      
  };

  
  
}
