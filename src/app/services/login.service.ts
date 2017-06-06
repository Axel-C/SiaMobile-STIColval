import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";

@Injectable()
export class LoginService{
    http:any;
    baseUrl: String;
    login : String ;
    password : String ;
    name : String ;
    siaId : any ;

    constructor(http:Http){
        this.http = http ;
        this.baseUrl = 'http://siaapi.azurewebsites.net/api'; 
    }

    

    getSiaId(login)   {
        return this.http.get(this.baseUrl + "/users/" + login)
        .map(res => res.json())
        .catch(err => {
            return Observable.throw(err.json().data || "Erreur serveur");
        })
    }

    echo(){
        console.log(this.login + "" + this.password);
    }

    getPeoples(){
        return this.http.get(this.baseUrl + "/users/assignableToticket" ).map(res => res.json());;
    }
     
}