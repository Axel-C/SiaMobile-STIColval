import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TicketsService} from '../../app/services/tickets.service';
import {DetailsPage } from '../details/details'
/*
  Generated class for the Ticket page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket.html'
})
export class TicketPage {
  tickets : any ;

  constructor(public navCtrl: NavController, public navParams: NavParams , private ticketsService:TicketsService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketPage');
  }

   doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    
    setTimeout(() => {
      this.getPosts(20 , 0);
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
 }

 ngOnInit(){
    this.getPosts( 20 , 0);
    
  }

  getPosts( limit , offset){
   this.ticketsService.getAsignatePost(  limit , offset).subscribe(response => {
      this.tickets = response;
      console.log(response)
      if(response.err)
      alert(response.err);
    });
  }


  viewItem(ticket){
    this.navCtrl.push(DetailsPage, {
      ticket:ticket
    });
  }

  

}
