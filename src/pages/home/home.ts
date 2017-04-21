import { Component } from '@angular/core';
import { AddPage } from '../add/add';
import {RedditService} from '../../app/services/reddit.service';
import {DetailsPage } from '../details/details'
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
      this.getPosts('nosleep' , 10);
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
    this.getPosts('tifu' , 5 );
    
  }

  getPosts(category , limit){
   this.redditService.getPosts(category, limit).subscribe(response => {
      this.items = response.data.children;
      
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
