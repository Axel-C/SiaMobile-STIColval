import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/Rx';
import 'rxjs/add/operator/catch';

@Injectable()
export class TicketsService{
    http:any;
    baseUrl: String;

    constructor(http:Http){
        this.http = http;
        this.baseUrl = 'http://siaapi.azurewebsites.net/api';
    }

    public getMyTickets(limit , offset){
        if (offset == 0){
            offset = 2000000
        }
        return this.http.get(this.baseUrl+'/Tickets?status=2&limit=' + limit  + '&max_id=' + offset)
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