import { Component } from '@angular/core';
import { AddPage } from '../add/add';
import {TicketsService} from '../../app/services/tickets.service';
import {DetailsPage } from '../details/details'
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
  
})
export class HomePage {
  addPage = AddPage ;
  tickets : any ; 
  

 doRefresh(refresher) {
    
    this.ticketsService.getMyTickets(10 , 0).subscribe(response => {
      this.tickets = response ;
      refresher.complete();
    })
 }


ngDoCheck(){
    
}



 refresh(){
    this.getPosts( 10);
 }

 goToAddPage() {
   console.log('test');
    this.navCtrl.push('addPage');
  }
 



  constructor(public navCtrl: NavController , private ticketsService:TicketsService) {
    
  }

  ngOnInit(){
    this.getPosts(10);
    
  }

  getPosts( limit){
   this.ticketsService.getMyTickets( limit , 0).subscribe(response => {
      this.tickets = response;
      
      
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
