import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'details.html'
})
export class DetailsPage {
    ticket : any;
    statusTab = ['Inconnu' , 'En cours (Attribué)' , 'En cours (Planifié)' , 'En attente' , 'Résolu' , 'Clos'] ;
    emergencyTab = ['Inconnu' , 'Très basse' , 'Basse' , 'Moyenne' , 'Haute' , 'Trés Haute'];
    constructor(public navCtrl: NavController, public params:NavParams) {
        this.ticket = params.get('ticket');
        this.ticket.status_text = this.statusTab[this.ticket.status];
        this.ticket.priority_text = this.emergencyTab[this.ticket.priority]
    }

}