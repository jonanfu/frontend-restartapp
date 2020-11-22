import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestauranteService } from '../../services/restaurante.service';

@Component({
  selector: 'app-modal-ver-restaurante',
  templateUrl: './modal-ver-restaurante.component.html',
  styleUrls: ['./modal-ver-restaurante.component.scss'],
})
export class ModalVerRestauranteComponent implements OnInit {

  restaurant: any = {}

  constructor(private modalCtrl: ModalController,
              private restarurante: RestauranteService
              ) 
  { }

  ngOnInit() {

    this.restarurante.traerRestaurante().then(resp=>{
      const restarurante = resp['datos']
      this.restaurant = restarurante[0]
    })
   
  }

  salir() {
    this.modalCtrl.dismiss();
  }

}
