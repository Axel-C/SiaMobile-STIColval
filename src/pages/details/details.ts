import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { TicketsService } from "../../app/services/tickets.service";
import { LoginService } from "../../app/services/login.service";

@Component({
  templateUrl: 'details.html'
})
export class DetailsPage {
    showButtonTake: boolean = false;
    ticket: any;
    showLocation : boolean = false ;
    
    statusTab = ['Inconnu' , 'En cours (Attribué)' , 'En cours (Planifié)' , 'En attente' , 'Résolu' , 'Clos'] ;
    emergencyTab = ['Inconnu' , 'Très basse' , 'Basse' , 'Moyenne' , 'Haute' , 'Trés Haute'];
    constructor(public navCtrl: NavController, public params:NavParams , private ticketsService:TicketsService , private toastCtrl: ToastController , private loginService : LoginService) {
        this.ticket = params.get('ticket');
        this.ticket.status_text = this.statusTab[this.ticket.status];
        this.ticket.priority_text = this.emergencyTab[this.ticket.priority];
        if(this.ticket.location != ""){
            this.showLocation = true ;
        }
        if(this.ticket.resolversId.indexOf(this.loginService.login) == -1 ){
            console.log("on affiche")
            this.showButtonTake = true ;
        }
        // this.ticket.content = this.ticket.content.replace(/\n/g, '<br/>');
    }

    close(id){
        
        this.ticketsService.CloseTicket(id).subscribe(response => {
            
            this.navCtrl.pop();
            this.toast('Le ticket vient d\'être clos')
        })
    }

    assignToMe(){
        this.ticketsService.assign(this.ticket.id , this.loginService.login).subscribe(respose => {
            this.toast('Le ticket vient de vous être assigné');
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