import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { LoginService } from "../../app/services/login.service";
import { TicketsService } from "../../app/services/tickets.service";

/*
  Generated class for the People page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-people',
  templateUrl: 'people.html'
})
export class PeoplePage {
    peoples : any ;
    peoplesNotAssignated : any ;
    assignatedPeople : any ;
    ticket : any ;


  constructor(public navCtrl: NavController, public navParams: NavParams , public loginService : LoginService , public ticketsService : TicketsService 
  , loadingController : LoadingController , private toastCtrl: ToastController ) {
    this.ticket = navParams.get('ticket'); 
    this.peoples = navParams.get('peoples'); 
    this.makeAssignatePeople();

  }

  makeAssignatePeople(){
    this.assignatedPeople = new Array(this.ticket.resolvers.length)
    for(var i = 0 ; i < this.ticket.resolvers.length ; i++){
      this.assignatedPeople[i] = new Object();
      this.assignatedPeople[i].id = this.ticket.resolversId[i];
      this.assignatedPeople[i].name = this.ticket.resolvers[i];
    }
    
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeoplePage');
  }


  ngOnInit(){
    if(this.peoples == undefined){
    this.loginService.getPeoples().subscribe(response => {
      this.peoples = response ;
      this.makeList()
    }
    )}else{
      this.makeList();
    }
  }

  makeList(){
    this.peoplesNotAssignated = this.peoples ;
    for(var i = 0 ; i < this.peoples.length ; i++){
      for(var j = 0 ; j < this.assignatedPeople.length ; j++){
        if(this.peoples[i].id == this.assignatedPeople[j].id){
          this.peoplesNotAssignated.splice(this.peoplesNotAssignated.indexOf(this.peoples[i]) , 1);
        }
      }
    }
    console.log(this.peoplesNotAssignated) ;
  }
  unassignate(people){
    this.ticketsService.UnAssign(this.ticket.id , people.id).subscribe(response => {
    
    this.toast('Le ticket a été enlevé  à ' + people.name );
    this.getDetails();
  })
  }

assignate( people){
  
  this.ticketsService.assign(this.ticket.id , people.id).subscribe(response => {
    
    this.toast('Le ticket a été attribué  à ' + people.realname + " " + people.firstname );
    this.getDetails();
  })
}

getDetails(){
        this.ticketsService.getDetails(this.ticket.id).subscribe(response => {
            
            // this.ticket.requestersId = response.requestersId ;
            // this.ticket.resolvers = response.resolvers ;
            // this.ticket.resolversId = response.resolversId ;
            // this.ticket.wat
            
            this.ticket = response ;
            this.makeAssignatePeople();
            this.makeList();
        })
    }

  

toast(msg){
         let toast = this.toastCtrl.create({
             message: msg ,
              duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }
}
