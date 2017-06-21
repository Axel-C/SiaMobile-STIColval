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
        
        this.baseUrl = 'https://siaapi.azurewebsites.net/api';
    }



    public getMyTickets( limit , offset , closed){
        if (offset == 0){
            offset = 2000000
        }
        var str = "" ;
        if(closed){
            str = "&closed=true&solved=false&open=false" ;
        }else{
            str = "&solved=true";
        }

        return this.http.get(this.baseUrl+'/Tickets/'+ this.loginService.login + '/created?limit=' + limit  + '&max_id=' + offset + str ,  {
            headers : this.loginService.authentificationHeader 
        })
            .map(res => res.json());

    }

 getAsignatePost( limit , offset , closed){
        if (offset == 0){
            offset = 2000000
        }
        var str = "" ;
        if(closed){
            str = "&closed=true&solved=false&open=false" ;
        }else{
            str = "&solved=true";
        }
        return this.http.get(this.baseUrl+'/Tickets/'+ this.loginService.login + '/assignedtouser?limit=' + limit  + '&max_id=' + offset + str, {
            headers : this.loginService.authentificationHeader 
        })
            .map(res => res.json());
    }

    public getWatchedTickets( limit , offset , closed){
          if (offset == 0){
            offset = 2000000
        }
        var str = "" ;
        if(closed){
            str = "&closed=true&solved=false&open=false" ;
        }else{
            str = "&solved=true";
        }

        return this.http.get(this.baseUrl+'/Tickets/'+ this.loginService.login + '/watchedbyuser?limit=' + limit  + '&max_id=' + offset + str ,  {
            headers : this.loginService.authentificationHeader 
        })
            .map(res => res.json());


    }

   getGroupeTickets(  limit , offset , closed){
        if (offset == 0){
            offset = 2000000
        }
        var str = "" ;
        if(closed){
            str = "&closed=true&solved=false&open=false" ;
        }else{
            str = "&solved=true";
        }
        return this.http.get(this.baseUrl+'/Tickets/'+ this.loginService.login + '/assignedtousersgroup?limit=' + limit  + '&max_id=' + offset + str , {
            headers : this.loginService.authentificationHeader 
        })
            .map(res => res.json());
    }

    
    

    
    create(ticket){
        let headers = new Headers({ 'Content-Type': 'application/json'  , 'Authorization': "Bearer " + this.loginService.azureToken});
      let options = new RequestOptions({headers: headers});
        // let headers = new Headers({'Content-Type':'application/json'});
        // let options = new RequestOptions({ headers: headers, method: "put"});
        console.log(JSON.stringify(ticket));
         return this.http
             .post(this.baseUrl + "/tickets" , JSON.stringify(ticket) , options)
             
            
    }

    private handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || ' error');
    }

    CloseTicket(id){
        return this.setStatus(id , 5);
  }

  setStatus(id , status){
      let options = new RequestOptions({headers: this.loginService.authentificationHeader});
      return this.http.put(this.baseUrl + "/tickets/" + id + "/setStatus?status="+ status , "" , options)
  }

  assign(ticketid , login){
      // let headers = new Headers({'Content-Type':'application/json'});
      let options = new RequestOptions({headers: this.loginService.authentificationHeader});
      return this.http.put(this.baseUrl + "/tickets/" + ticketid + "/assign?user_id="+ login  , "" , options)
  }

  UnAssign(ticketid , login){
      let options = new RequestOptions({headers: this.loginService.authentificationHeader});
      return this.http.put(this.baseUrl + "/tickets/" + ticketid + "/unassign?user_id="+ login , "" , options)
  }

  observ(ticketid){
      let options = new RequestOptions({headers: this.loginService.authentificationHeader});
      return this.http.put(this.baseUrl + "/tickets/" + ticketid + "/watch?user_id="+ this.loginService.login , "" , options)
  }

   unobserv(ticketid){
      let options = new RequestOptions({headers: this.loginService.authentificationHeader});
      return this.http.put(this.baseUrl + "/tickets/" + ticketid + "/unwatch?user_id="+ this.loginService.login , "" , options)
  }

  getFollowUp(ticketId){
       return this.http.get(this.baseUrl+'/Tickets/'+ ticketId + "/getfollowup"  , {
           headers : this.loginService.authentificationHeader 
       })
            .map(res => res.json());
  }

  postFollowUp( followUp){
      let headers = new Headers({ 'Content-Type': 'application/json'  , 'Authorization': "Bearer " + this.loginService.azureToken});
      let options = new RequestOptions({headers: headers});
      return this.http
             .put(this.baseUrl + "/tickets/addfollowup" , JSON.stringify(followUp), options)
  }

  getDetails(ticketid){
        return this.http.get(this.baseUrl+'/Tickets/'+ ticketid  , {headers : this.loginService.authentificationHeader})
            .map(res => res.json());
  }

     
}