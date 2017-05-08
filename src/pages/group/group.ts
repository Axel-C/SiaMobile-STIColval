import { Component } from '@angular/core';
import {TicketsService} from '../../app/services/tickets.service';
import {DetailsPage } from '../details/details'
import { NavController } from 'ionic-angular';

/*
  Generated class for the Group page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-group',
  templateUrl: 'group.html'
})
export class GroupPage {
  tickets : any ;

  constructor(public navCtrl: NavController , private ticketsService : TicketsService) {}

ngOnInit() {
    this.getTickets(10 , 0);
  
}


  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    
    setTimeout(() => {
      
      refresher.complete();
    }, 2000);
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupPage');
  }

  getTickets(limit , offset){
    console.log('Récupération des tickets');
    this.ticketsService.getGroupeTickets(null  , limit , offset).subscribe(response => {
      this.tickets = response ;
      console.log(response);
      console.log(this.tickets);
    })
    
  }

  viewItem(ticket){
    this.navCtrl.push(DetailsPage, {
      ticket:ticket
    });
  }

}
