import { Component, Input } from '@angular/core';
import { Hero } from './hero';
import { Events, Content } from "ionic-angular";
@Component({
  selector: 'liste',
  templateUrl: 'liste.html',
  viewProviders: [Content] 
})
export class Liste {
  @Input() tickets : any ;
  
  

constructor(private events : Events){
  
}

  ngOnInit(){
    // this.request.subscribe(response => {
    //   this.tickets = response;
      
      
    //   if(response.err)
    //   alert(response.err);
    //});
    
  }

   
  
}