import { Component } from '@angular/core';
import { AddPage } from '../add/add';
import {TicketsService} from '../../app/services/tickets.service';
import {DetailsPage } from '../details/details'
import { NavController, Events, ActionSheetController, Platform, App } from 'ionic-angular';
import { Login } from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html' 
 
  
})
export class HomePage {
  addPage = AddPage ;
  tickets : any ; 
  closedTickets = [] ;
  offset = 0 ;
  nbClosed = 0 ;
  filtreActif :boolean = false ;
  ticketsCopy : any ;
  login = Login ;
  showedClosedTicket : boolean = false ;
  

 doRefresh(refresher) {
    
    this.ticketsService.getMyTickets(200 , 0 , false).subscribe(response => {
      this.tickets = response ;
      this.parcourir();
      refresher.complete();
    })
 }


ngDoCheck(){
    
}

reinitialiser(){
  this.tickets = this.ticketsCopy ;
  this.showedClosedTicket = false ;
  this.filtreActif = false ;
  this.offset = 0 ;
}


 refresh(){
   this.showedClosedTicket = false  ;
    this.getPosts( 50);

   // this.getClosedPost(this.nbClosed)
 }

 goToAddPage() {
    this.navCtrl.push('addPage');
  }
 



  constructor(public navCtrl: NavController , private ticketsService:TicketsService , 
  private events : Events , public actionSheetCtrl: ActionSheetController , public platform : Platform , private app : App ) {
    
    

    this.events.subscribe('reloadPage',() => {
        this.refresh();
});
  }

  

  ngOnInit(){
    this.getPosts(200);
    // this.getClosedPost(15);
    
  }

  getPosts( limit){
   this.ticketsService.getMyTickets( limit , 0 , false).subscribe(response => {
      this.tickets = response;
      this.ticketsCopy = response ;
      this.parcourir();
      if(response.err)
      alert(response.err);
    });
  }

  getClosedPost(limit){
    this.ticketsService.getMyTickets( 10 , this.offset , true).subscribe(response => {
      this.closedTickets = response ;
      if(this.closedTickets.length > 0){
        this.offset = this.closedTickets[this.closedTickets.length - 1].id - 1 ;
      }else{
        this.offset = 0 ;
      }
      this.nbClosed = limit ;
      if(response.err)
      alert(response.err);
    });
  }


  viewItem(ticket){
    this.navCtrl.push(DetailsPage, {
      ticket:ticket 
    });
  }

doInfinite(infiniteScroll){
  this.ticketsService.getMyTickets( 10 , this.offset , true).subscribe(response => {
      this.closedTickets = this.closedTickets.concat(response) ;
      this.offset = this.closedTickets[this.closedTickets.length - 1].id - 1
      this.nbClosed += 10 ;
      infiniteScroll.complete();
      if(response.err)
      alert(response.err);
    });
  
  
}

parcourir(){
  var statusTab = ['Inconnu' , 'Nouveau' , 'En cours (Attribué)' , 'En cours (Planifié)' , 'En attente' , 'Résolu' , 'Clos'] ;
  for(var i = 0 ; i < this.tickets.length ; i++ ){
    this.tickets[i].status_text = statusTab[this.tickets[i].status];
    this.tickets[i].date_text = new Date(this.tickets[i].date).toLocaleDateString();
    this.tickets[i].hour = new Date(this.tickets[i].date).getHours();
    this.tickets[i].minute = new Date(this.tickets[i].date).getMinutes();
  }
}

trier() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [
        {
          text: 'Trier par date',
          icon: !this.platform.is('ios') ? 'time' : null, 
          handler: () => {
            this.tickets = this.tickets.sort(function(a , b){
              var datea = new Date(a.date_mod + "Z");
              var dateb = new Date(b.date_mod + "Z");
              if(datea.getTime() < dateb.getTime()){
                return 1
              }if(datea.getTime() > dateb.getTime()){
                return -1 ;
              }
              return 0 ;
            }
            
            )
          }
        },{
          text: 'Trier par urgence',
          icon: !this.platform.is('ios') ? 'thermometer' : null, 
          handler: () => {
            this.tickets = this.tickets.sort(function(a , b){
              console.log("debug");
                if(a.priority < b.priority){
                  return 1
                }if(a.priority > b.priority){
                  return -1 ;
                }
                return 0 ;
            }
            
            )
            console.log(this.tickets);
          }
        },{
          text: 'Filtrer par lieu',
          icon: !this.platform.is('ios') ? 'pin' : null,
          handler: () => {
            this.trierParLieu();
          }
        },{
          text: 'Filter par statut',
          icon: !this.platform.is('ios') ? 'flag' : null,
          handler: () => {
            this.trierParStatue();
          }
        },{
          text: 'Aide',
          icon: !this.platform.is('ios') ? 'help' : null,
          handler: () => {
            
          }
        },{
          text: 'Se déconnecter',
          icon: !this.platform.is('ios') ? 'exit' : null,
          handler: () => {
            this.app.getRootNav().setRoot(Login);
          }
        },{
          text: 'Fermer',
          icon: !this.platform.is('ios') ? 'close' : null,
          role: 'cancel',
          
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  trierParLieu(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choisissez un lieu ...',
      buttons: [
        {
          text: 'Inconnu',
          icon: !this.platform.is('ios') ? 'time' : null, 
          handler: () => {
              this.filtrerLieu(null);
            }
            
        },{
          text: 'Annuler',
          icon: !this.platform.is('ios') ? 'close' : null,
          role: 'cancel',
          
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
     let parent : Array<String> = [] ;
    for(var i=0 ; i < this.tickets.length ; i++){
      if(parent.indexOf(this.tickets[i].parent_location) == -1 && this.tickets[i].parent_location != null ){
        console.log(this.tickets[i].parent_location);
        parent.push(this.tickets[i].parent_location);
    }else{
      console.log(parent.indexOf(this.tickets[i].parent_location) )
    }}
    console.log(parent.indexOf("Aile A"));
    console.log(parent);
    if(parent.indexOf("Aile A") != -1){
      actionSheet.addButton({
        text : 'Aile A' ,
        icon: !this.platform.is('ios') ? 'pin' : null,
        handler: () => {
            this.filtrerLieu("Aile A");
          }

      })
    }
    if(parent.indexOf("Aile B") != -1){
      actionSheet.addButton({
        text : 'Aile B' ,
        icon: !this.platform.is('ios') ? 'pin' : null,
        handler: () => {
            this.filtrerLieu("Aile B");
          }

      })
    }
    if(parent.indexOf("Aile C")!= -1){
      actionSheet.addButton({
        text : 'Aile C' ,
        icon: !this.platform.is('ios') ? 'pin' : null,
        handler: () => {
            this.filtrerLieu("Aile C");
          }

      })
    }
    if(parent.indexOf("Aile D")!= -1){
      actionSheet.addButton({
        text : 'Aile D' ,
        icon: !this.platform.is('ios') ? 'pin' : null,
        handler: () => {
            this.filtrerLieu("Aile D");
          }

      })
    }
    if(parent.indexOf("Aile E")!= -1){
      actionSheet.addButton({
        text : 'Aile E' ,
        icon: !this.platform.is('ios') ? 'pin' : null,
        handler: () => {
            this.filtrerLieu("Aile E");
          }

      })
    }
    if(parent.indexOf("Aile F")!= -1){
      actionSheet.addButton({
        text : 'Aile F' ,
        icon: !this.platform.is('ios') ? 'pin' : null,
        handler: () => {
            this.filtrerLieu("Aile F");
          }

      })
    }
    if(parent.indexOf("Aile G")!= -1){
      actionSheet.addButton({
        text : 'Aile G' ,
        icon: !this.platform.is('ios') ? 'pin' : null,
        handler: () => {
            this.filtrerLieu("Aile G");
          }

      })
    }

    actionSheet.present();
  }

  trierParStatue(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choisissez un statut :',
      buttons: [
        {
          text: 'Annuler',
          icon: !this.platform.is('ios') ? 'close' : null,
          role: 'cancel',
          
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
     let parent : Array<number> = [] ;
    for(var i=0 ; i < this.tickets.length ; i++){
      if(parent.indexOf(this.tickets[i].status) == -1 && this.tickets[i].status != 0 ){
        parent.push(this.tickets[i].status);
    }}
    if(parent.indexOf(1)!= -1){
      actionSheet.addButton({
        text : 'Nouveau' ,
        icon: !this.platform.is('ios') ? 'add' : null,
        handler: () => {
            this.filtrerStatus(1)
          }

      })
    }
    if(parent.indexOf(2)!= -1){
      actionSheet.addButton({
        text : 'En cours (Plannifié)' ,
        icon: !this.platform.is('ios') ? 'play' : null,
        handler: () => {
            this.filtrerStatus(2);
          }

      })
    }
    if(parent.indexOf(3)!= -1){
      actionSheet.addButton({
        text : 'En cours (Attribué)' ,
        icon: !this.platform.is('ios') ? 'play' : null,
        handler: () => {
            this.filtrerStatus(3);
          }

      })
    }
    if(parent.indexOf(4)!= -1){
      actionSheet.addButton({
        text : 'En attente' ,
        icon: !this.platform.is('ios') ? 'pause' : null,
        handler: () => {
            this.filtrerStatus(4);
          }

      })
    }
    if(parent.indexOf(5)!= -1){
      actionSheet.addButton({
        text : 'Terminé' ,
        icon: !this.platform.is('ios') ? 'checkmark' : null,
        handler: () => {
            this.filtrerStatus(5);
          }

      })
    }
    actionSheet.addButton(
    {
          text: 'Clos',
          icon: !this.platform.is('ios') ? 'close-circle' : null,
          handler: () => {
            this.showedClosedTicket = true ;
            this.showClosedTicket();
          }
        })
    
    
    
    

    actionSheet.present();
  }


  filtrerLieu(lieu){
    console.log(this.tickets);
    var retour = new Array();
    for(var i = 0 ; i < this.tickets.length ; i++){
      if(this.tickets[i].parent_location == lieu){
        retour.push(this.tickets[i]);
        
      }
    }
    this.filtreActif = true ;
    this.tickets = retour ;
  }

  filtrerStatus(status){
    console.log(this.tickets);
    var retour = new Array();
    for(var i = 0 ; i < this.tickets.length ; i++){
      if(this.tickets[i].status == status){
        retour.push(this.tickets[i]);
        
      }
    }
    this.filtreActif = true ;
    this.tickets = retour ;
  }

  showClosedTicket(){
    this.ticketsService.getMyTickets( 10 , this.offset , true).subscribe(response => {
      this.tickets = response ;
      if(this.tickets.length > 0){
        this.offset = this.tickets[this.tickets.length - 1].id - 1 ;
        this.filtreActif = true ;
      }else{
        this.offset = 10 ;
      }
      this.nbClosed = 10 ;
      this.parcourir();
      if(response.err)
      alert(response.err);
    });
  }


   

  

}
