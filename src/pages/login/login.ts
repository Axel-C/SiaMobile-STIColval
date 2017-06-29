import { Component } from '@angular/core';

import { NavController , Loading } from 'ionic-angular';
import { AlertController, LoadingController, Platform } from 'ionic-angular';
import { LoginService} from '../../app/services/login.service';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from "../home/home";

declare var Microsoft: any;

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'

})
export class Login {
HomePage = HomePage
TabsPage = TabsPage ;
SiaId :any ;
password ;

 
  constructor(public navCtrl: NavController , public alertCtrl: AlertController  , private loginService:LoginService , public loadingController: LoadingController
  , platform: Platform) {
    platform.ready().then(() => {
    this.authentificate();
    console.log(this.loginService.azureToken);
    })
    
  }
  authentificate(){
    this.loginService.authentificate().then((res) => {
          // stockage du jeton dans une variable de la classe
          this.loginService.azureToken = res.accessToken ;
          // stockage du jeton dans une base de donnée interne à l'application
          // this.loginService.storage.set("azureToken" , this.azureToken);
          // création du header qui sera envoyé avec toutes les requêtes
          this.loginService.createAuthorizationHeader();
          this.login();
          
        } , (err) => {
            this.authentificate();
            
        });
  }
  
 login(){
   let loader = this.loadingController.create({
      content: "Authentification en cours ..." 
    });   
    loader.present();
    this.loginService.getSiaId().subscribe(response => {
      this.loginService.name = response.firstname + " " + response.realname ;
      
      this.loginService.login = response.id ;
      this.navCtrl.push(HomePage);
     this.navCtrl.setRoot(TabsPage);
     loader.dismiss();
    } ,
    err => {
      alert("Erreur : Impossible de se connecter \n Veuillez réessayer plus tard :) ")
      loader.dismiss();
    }
    );
    console.log("Sia" + this.SiaId);
     
     
      
  };

//  authentificate(){
//    console.log("YIHAA");
//     let authContext = new Microsoft.ADAL.AuthenticationContext("https://login.microsoftonline.com/colval.onmicrosoft.com");
//     //authContext.acquireTokenAsync("https://graph.windows.net", "059e7fe8-80c7-4983-b0c9-7b92cee4d807", "http://MyDirectorySearcherApp")
//       authContext.acquireTokenAsync("http://colval.onmicrosoft.com/siaapi", "059e7fe8-80c7-4983-b0c9-7b92cee4d807", "http://MyDirectorySearcherApp")
//         .then((res) => {
//           console.log("Token Recu :");
//           console.log(res);
//           //https://graph.windows.net
//           this.loginService.azureToken = res.accessToken ;
//           //console.log(res.accessToken); 
//           //console.log(this.loginService.azureToken);
//         } , (err) => {
//           console.log(err);
//         });
//         ;
        
//   }




  
  
}
