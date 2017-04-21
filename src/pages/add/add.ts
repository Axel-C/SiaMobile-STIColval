import { Component } from '@angular/core';
import {CategoryService} from '../../app/services/category.service';
import {PlacesService} from '../../app/services/places.service';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'

})
export class AddPage {
  categories : any ;
  locations : any ;

 
  constructor(public navCtrl: NavController , private categoryService:CategoryService , private placesService:PlacesService) {
    
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
    

}

