import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';

@Injectable()
export class TicketsService{
    http:any;
    baseUrl: String;

    constructor(http:Http){
        this.http = http;
        this.baseUrl = 'URL';
    }

    getMyTickets(offset , limit){
        return this.http.get(this.baseUrl+'/topjson?limit='+limit)
            .map(res => res.json());

    }

    getGroupeTickets(groupe , offset , limit){
        return this.http.get(this.baseUrl+'/topjson?limit='+limit)
            .map(res => res.json());
    }

    getAtribuatedPost(offset , limit){
        return this.http.get(this.baseUrl+'/topjson?limit='+limit)
            .map(res => res.json());
    }

     
}