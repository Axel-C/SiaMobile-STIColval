import { Component } from '@angular/core';
import {CategoryService} from '../../app/services/category.service';
import {PlacesService} from '../../app/services/places.service';
import {TicketsService } from '../../app/services/tickets.service'
import {LoginService } from '../../app/services/login.service'
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { HomePage } from "../home/home";

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'

})
export class AddPage {
   
  categories : any ;
  locations : any ;
  //éléments du formulaire
  type : any = 1 ; 
  category : any ;
  place : any ;
  emergency : any = 3;
  title : any ;
  content : any ;



 
  constructor(public navCtrl: NavController , private categoryService:CategoryService , private placesService:PlacesService 
  , private ticketsService : TicketsService , private loginService : LoginService , private toastCtrl: ToastController , 
  public loadingController: LoadingController ) {
    
  }

  ngOnInit(){
    this.getCateg();
    this.getLieu();
  }

  

  getCateg(){
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response ;
    }
    
    )
  }

  getLieu(){
    this.placesService.getPlaces().subscribe(response => {
      this.locations = response ;
    }
    
    )
  }

  submit(){
    let loader = this.loadingController.create({
      content: "Envoi du ticket en cours ..." 
    });
    loader.present();
    var ticket = {
      type : this.type,
      place : this.place,
      itilcategories_id : this.category,
      priority : this.emergency,
      status : 1 ,
      users_id_recipient : this.loginService.login ,
      name : this.title,
      content : this.content
    }
   console.log(ticket);
   this.ticketsService.create(ticket).subscribe(res => {
     loader.dismiss();
      this.navCtrl.pop();
      this.presentToast();
      
     
   });
  
  
   
}

presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Le ticket a bien été envoyé',
    duration: 3000,
    position: 'bottom'
  });
  console.log('test');
  toast.present();
}


}

