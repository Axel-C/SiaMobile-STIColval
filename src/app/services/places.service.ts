import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { LoginService } from "./login.service";

@Injectable()
export class PlacesService{
    http:any;
    baseUrl: String;

    constructor(http:Http ,  public loginService : LoginService){
        this.http = http;
        this.baseUrl = 'http://siaapi.azurewebsites.net/api/locations';
    }

    getPlaces(){
        return this.http.get(this.baseUrl , {
            headers : this.loginService.authentificationHeader 
        })
            .map(res => res.json());

    }

     
}