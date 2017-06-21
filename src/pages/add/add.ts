import { Component } from '@angular/core';
import {CategoryService} from '../../app/services/category.service';
import {PlacesService} from '../../app/services/places.service';
import {TicketsService } from '../../app/services/tickets.service'
import {LoginService } from '../../app/services/login.service'
import { NavController, ToastController, LoadingController, Events } from 'ionic-angular';
import { HomePage } from "../home/home";



@Component({
  selector: 'page-add',
  templateUrl: 'add.html'

})
export class AddPage {
   
  categories : any ;
  buildings = new Array() ;
  ChoosedBuilding : any ;
  locations = new Array() ;
  AllLocation : any ;
  //éléments du formulaire
  type : any = 1 ; 
  category : any ;
  place : any ;
  emergency : any = 3;
  title : any ;
  content : any ;



 
  constructor(public navCtrl: NavController , private categoryService:CategoryService , private placesService:PlacesService 
  , private ticketsService : TicketsService , private loginService : LoginService , private toastCtrl: ToastController , 
  public loadingController: LoadingController , private events : Events) {
    
  }

  ngOnInit(){
    this.getCateg();
    this.getLieu();
  }

  

  getCateg(){
    this.categoryService.getCategories().subscribe(response => {
      // on stocke le contenu de la réponse à la requeête dans un tableau de la classe.
      this.categories = response ;
    }
    
    )
  }

  getLieu(){
    this.placesService.getPlaces().subscribe(response => {
      this.AllLocation = response ;
      console.log(this.locations);
      this.getBuildings();
    }
    
    )
  }

  submit(){
    
    var valide = true ;

    var lieu
    if(this.place == undefined){
      if(this.ChoosedBuilding != undefined){
        lieu = this.ChoosedBuilding ;
      }else{
        valide = false ;
      }

    }else{
      lieu = this.place ;
    }

    if(this.category == undefined || this.title == undefined || this.content == undefined ){
      valide = false ;
    }

    if(valide){
    let loader = this.loadingController.create({
      content: "Envoi du ticket en cours ..." 
    });
    loader.present();

    var ticket = {
      type : this.type,
      locations_id : lieu,
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
      this.events.publish('reloadPage');
      this.navCtrl.pop();
      this.presentToast();

      
     
   });
  
    }else{
      alert('Meci de bien renseigné tous les champs');
    }
   
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

getBuildings(){
  for(var i = 0 ; i < this.AllLocation.length ; i++){
    if(this.AllLocation[i].level == 1){
      this.buildings.push(this.AllLocation[i]);

    }
  }
}

listLocation(event){
    for(var i = 0 ; i < this.AllLocation.length ; i++){
      if(this.AllLocation[i].firstparent == event){
        this.locations.push(this.AllLocation[i]);
      }
    }
}


}

