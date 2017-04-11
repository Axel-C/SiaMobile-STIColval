import { Component } from '@angular/core';
import { AddPage } from '../add/add';
import {RedditService} from '../../app/services/reddit.service';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
  
})
export class HomePage {
  addPage = AddPage ;
  items : any ; 
  

 doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
 }

 goToAddPage() {
   console.log('test');
    this.navCtrl.push('addPage');
  }




  constructor(public navCtrl: NavController , private redditService:RedditService) {
    
  }

  ngOnInit(){
    this.getPosts('aww' , 5 );
    
  }

  getPosts(category , limit){
   this.redditService.getPosts(category, limit).subscribe(response => {
      this.items = response.data.children;
    });
  }

}
