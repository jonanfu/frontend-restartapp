import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';
import { RestauranteService } from '../../services/restaurante.service';


@Component({
  selector: 'app-popmenu-cat',
  templateUrl: './popmenu-cat.component.html',
  styleUrls: ['./popmenu-cat.component.scss'],
})
export class PopmenuCatComponent implements OnInit {


  constructor(private popCtrl: PopoverController) { }

  ngOnInit() { }

  addMasArticulos(){
    this.popCtrl.dismiss({
      Agregar: 'agregar'
    })
  }

  cambiarNombreCat() {
    this.popCtrl.dismiss({
      Cambiar:'cambiar'
    })
  }

  eliminarNombreCat() {
    
    this.popCtrl.dismiss({
      Eliminar:'eliminar'
    })
    
  }

  

}
