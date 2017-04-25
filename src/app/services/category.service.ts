import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/Rx';
import 'rxjs/add/operator/catch';

@Injectable()
export class CategoryService{
    http:any;
    baseUrl: String;

    constructor(http:Http){
        this.http = http;
        this.baseUrl = 'http://siaapi.azurewebsites.net/api/ticketcategories'
    }

    getCategories(){
        return this.http.get(this.baseUrl)
            .map(res => res.json());

    }

     
}