import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { LoginService } from "./login.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class TicketsService{
    http:any;
    baseUrl: String;

    constructor(http:Http , public loginService:LoginService){
        this.http = http;
        
        this.baseUrl = 'http://siaapi.azurewebsites.net/api';
    }

    public getMyTickets( limit , offset){
        if (offset == 0){
            offset = 2000000
        }
        return this.http.get(this.baseUrl+'/Tickets/'+ this.loginService.login + '/created?limit=' + limit  + '&max_id=' + offset)
            .map(res => res.json());

    }

    getGroupeTickets(groupe , limit , offset){
        if (offset == 0){
            offset = 2000000
        }
      return this.http.get(this.baseUrl+'/Tickets/'+ this.loginService.login + '/assignedtousersgroup?limit=' + limit  + '&max_id=' + offset)
            .map(res => res.json());
    }

    getAsignatePost( limit , offset){
        if (offset == 0){
            offset = 2000000
        }
        return this.http.get(this.baseUrl+'/Tickets/'+ this.loginService.login + '/assignedtouser?limit=' + limit  + '&max_id=' + offset)
            .map(res => res.json());
    }

    create(ticket){

         let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({ headers: headers, method: "put"});
        console.log(JSON.stringify(ticket));
         return this.http
             .post(this.baseUrl + "/tickets" , JSON.stringify(ticket), {headers: headers})
             
            
    }

    private handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || ' error');
    }

    CloseTicket(id){
        return this.setStatus(id , 5);
  }

  setStatus(id , status){
      let headers = new Headers({'Content-Type':'application/json'});
      return this.http.put(this.baseUrl + "/tickets/" + id + "/setStatus?status="+ status , "" , {hearders : headers})
  }

  assign(ticketid , login){
      let headers = new Headers({'Content-Type':'application/json'});
      return this.http.put(this.baseUrl + "/tickets/" + ticketid + "/assign?user_id="+ login , "" , {hearders : headers})
  }

     
}