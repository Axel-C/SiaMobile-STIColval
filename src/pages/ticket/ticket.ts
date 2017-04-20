import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {RedditService} from '../../app/services/reddit.service';
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
  items : any ;

  constructor(public navCtrl: NavController, public navParams: NavParams , private redditService:RedditService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketPage');
  }

   doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    
    setTimeout(() => {
      this.getPosts('showerthoughts' , 50);
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
 }

 ngOnInit(){
    this.getPosts('jokes' , 5 );
    
  }

  getPosts(category , limit){
   this.redditService.getPosts(category, limit).subscribe(response => {
      this.items = response.data.children;
      console.log("Reponse : " + response)
      if(response.err)
      alert(response.err);
    });
  }


  viewItem(item){
    this.navCtrl.push(DetailsPage, {
      item:item
    });
  }

}
