import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { LoginService } from "./login.service";

@Injectable()
export class CategoryService{
    http:any;
    baseUrl: String;
    // Constructeur de la classe
    constructor(http:Http , public loginService : LoginService){
        this.http = http;
        this.baseUrl = 'http://siaapi.azurewebsites.net/api/ticketcategories'
    }

    
    // Méthode appelée pour récupérer la liste des catégories
    getCategories(){
        return this.http.get(this.baseUrl , {
            headers : this.loginService.authentificationHeader 
        })
            .map(res => res.json());

    }

     
}