import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";

declare var Microsoft: any;

@Injectable()
export class LoginService{
    http:any;
    baseUrl: String;
    login : String ;
    password : String ;
    name : String ;
    siaId : any ;
    azureToken : String ;
    authentificationHeader : any ;

    constructor(http:Http , private storage: Storage){
        this.http = http ;
        this.baseUrl = 'https://siaapi.azurewebsites.net/api'; 
    }

    getSiaId()   {
        return this.http.get(this.baseUrl + "/users/getid/", {
            headers : this.authentificationHeader 
        })
        .map(res => res.json())
        .catch(err => {
            return Observable.throw(err.json().data || "Erreur serveur");
        })
    }

    echo(){
        console.log(this.login + "" + this.password);
    }

    getPeoples(){
        return this.http.get(this.baseUrl + "/users/assignableToticket" ,  {
            headers : this.authentificationHeader 
        } ).map(res => res.json());;
    }
     
     createAuthorizationHeader() {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' +
    this.azureToken );
    this.authentificationHeader = headers ;
  }

  authentificate(){
      // Création du contexte de connexion 
    let authContext = new Microsoft.ADAL.AuthenticationContext("https://login.microsoftonline.com/colval.onmicrosoft.com");
    return  authContext.acquireTokenAsync("http://colval.onmicrosoft.com/siaapi", "059e7fe8-80c7-4983-b0c9-7b92cee4d807", "http://MyDirectorySearcherApp")
        
        
  }
//   this.storage.get('azureToken').then((val) => {
//              console.log('Le token de la base :', val);
//         });
  
}