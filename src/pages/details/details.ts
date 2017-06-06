import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Events, Loading, LoadingController } from 'ionic-angular';
import { TicketsService } from "../../app/services/tickets.service";
import { LoginService } from "../../app/services/login.service";
import { PeoplePage } from "../people/people";

@Component({
  templateUrl: 'details.html'
})
export class DetailsPage {
    showButtonTake: boolean = false;
    showButtonValidate : boolean = false ;
    showButtonDone : boolean = false ;
    showButtonObserv : boolean = false ;
    showButtonPause : boolean = false ;
    showButtonUnPause : boolean = false ;

    text : any ;
    peoples ;
    peoplePage : PeoplePage  ;
    ticket: any;
    followUps : any ;
    showLocation : boolean = false ;
    textarea : String ;
    
    statusTab = ['Inconnu' , 'Nouveau' , 'En cours (Attribué)' , 'En cours (Planifié)' , 'En attente' , 'Résolu' , 'Clos'] ;
    emergencyTab = ['Inconnu' , 'Très basse' , 'Basse' , 'Moyenne' , 'Haute' , 'Trés Haute'];
    constructor(public navCtrl: NavController, public params:NavParams , private ticketsService:TicketsService , private toastCtrl: ToastController , public loginService : LoginService ,
    private events : Events , private loadingController : LoadingController ) {
        this.ticket = params.get('ticket');
        
        
        if(this.ticket.location != ""){
            this.showLocation = true ;
        }
        // if(this.ticket.resolversId.indexOf(this.loginService.login) == -1 ){
        //     console.log("on affiche")
         
        // }
        this.ticket.content = this.ticket.content.replace(/\n/g, '<br/>');
        
    }

    goToPeople(){
        this.navCtrl.push(PeoplePage , {
            ticket : this.ticket ,
            peoples : this.peoples
        });
    }

    validate(){
        let loader = this.loadingController.create({
      content: "Veuillez patienter ..." 
    });   
    loader.present();
        this.ticketsService.setStatus(this.ticket.id , 6 ).subscribe(response => {
            this.events.publish('reloadPage');
            loader.dismiss();
            this.navCtrl.pop();
            this.toast('Merci ! Le ticket vient d\'être validé')
        })
    }

    ngOnInit(){
        this.getDetails()
        this.loginService.getPeoples().subscribe(response => {
      this.peoples = response ;
    })
    }

    initialiserBouton(){
        console.log(this.ticket);
        console.log(this.loginService.login)
        if(this.ticket.requestersId == this.loginService.login && this.ticket.status == 5){
            this.showButtonValidate = true ;
            console.log("yes !")
        }else{
            this.showButtonValidate = false ;
        }
        if(this.ticket.status < 5 && this.ticket.resolversId.indexOf(this.loginService.login) != -1 ){
            this.showButtonDone = true ;
        }else{
            this.showButtonDone = false ;
        }
        if(this.ticket.status < 5 && this.ticket.resolversId.indexOf(this.loginService.login) == -1 ){
            this.showButtonTake = true ;
            
        }else{
            this.showButtonTake = false ;
        }
        console.log(this.ticket.resolversId.indexOf(this.loginService.login));
        if(this.ticket.status < 5 && this.ticket.watchersId.indexOf(this.loginService.login) == -1 ){
            this.showButtonObserv = true ;
        }else{
            this.showButtonObserv = false ;
        }
        if(this.ticket.status < 4 && this.ticket.resolversId.indexOf(this.loginService.login) != -1 ){
            this.showButtonPause = true ;
        }else{
            this.showButtonPause = false;
        }
        if(this.ticket.status == 4 && this.ticket.resolversId.indexOf(this.loginService.login) != -1 ){
            this.showButtonUnPause = true ;
        }else{
            this.showButtonUnPause = false ;
        }

    }

    observer(){
        this.ticketsService.observ(this.ticket.id).subscribe(response => {
            this.toast('Vous observer maintenant le ticket');
            this.getDetails();
        })
    }

    nePlusObserver(){
        this.ticketsService.unobserv(this.ticket.id).subscribe(response => {
            this.toast('Vous n\' observer plus le ticket');
            this.getDetails();
        })
    }

    close(id){
        let loader = this.loadingController.create({
      content: "Veuillez patienter ..." 
    });   
    loader.present();
        this.ticketsService.CloseTicket(id).subscribe(response => {
            this.events.publish('reloadPage');
            loader.dismiss();
            this.navCtrl.pop();
            this.toast('Le ticket vient d\'être clos')
        })
    }

    pause(){
        let loader = this.loadingController.create({
      content: "Veuillez patienter ..." 
    });   
    loader.present();
        this.ticketsService.setStatus(this.ticket.id , 4).subscribe(response => {
            this.events.publish('reloadPage');
            loader.dismiss();
            this.getDetails();
            this.toast('Le ticket vient d\'être mis en pause')
        })
    }

    unPause(){
        let loader = this.loadingController.create({
      content: "Veuillez patienter ..." 
    });   
    loader.present();
        this.ticketsService.setStatus(this.ticket.id , 3).subscribe(response => {
            this.events.publish('reloadPage');
            loader.dismiss();
            this.getDetails()
            this.toast('Le ticket vient d\'être repris')
        })
    }

    assignToMe(){
        this.ticketsService.assign(this.ticket.id , this.loginService.login).subscribe(respose => {
            this.toast('Le ticket vient de vous être assigné');
            this.getDetails();
        })
    }

    unassign(){
        this.ticketsService.UnAssign(this.ticket.id , this.loginService.login).subscribe(respose => {
            this.toast('Le ticket vient de vous être déassigné');
            this.getDetails();
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

    getDetails(){
        this.ticketsService.getDetails(this.ticket.id).subscribe(response => {
            
            this.followUps = response.followups ;
            // this.ticket.requestersId = response.requestersId ;
            // this.ticket.resolvers = response.resolvers ;
            // this.ticket.resolversId = response.resolversId ;
            // this.ticket.wat
            this.ticket = response ;
            console.log(this.ticket.status);
            this.ticket.status_text = this.statusTab[this.ticket.status];
            this.ticket.priority_text = this.emergencyTab[this.ticket.priority];
            console.log(this.ticket);
            this.initialiserBouton();
        })
    }

    reply(){
        var followUp = {
            users_id : this.loginService.login ,
       tickets_id : this.ticket.id ,
        content : this.textarea 
        } ;
        
        
        this.ticketsService.postFollowUp(followUp).subscribe(response => {
            this.toast("La réponse à bien été envoyé");
            this.textarea = "" ;
            this.getDetails();
        })
    }

}