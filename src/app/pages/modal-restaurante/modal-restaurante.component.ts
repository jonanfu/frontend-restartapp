import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UiService } from '../../services/ui.service';
import { RestauranteService } from '../../services/restaurante.service';

@Component({
  selector: 'app-modal-restaurante',
  templateUrl: './modal-restaurante.component.html',
  styleUrls: ['./modal-restaurante.component.scss'],
})
export class ModalRestauranteComponent implements OnInit {

  datos = {
    _id:'',
    nombreRes: '',
    ruc: '',
    telefono: '',
    ciudad: '',
    direccion: '',
    mesas: 0
  }

  idRestaurant: any = {}

  constructor(private modalCtrl: ModalController,
              private uiservice: UiService,
              private resService: RestauranteService)
  { 
    this.resService.traerRestaurante().then(resp => {
      // console.log('datos: ',resp);
        const datos = resp['datos']
        this.idRestaurant = datos[0];
      })
  }

  ngOnInit() { }

  async salir() {
    this.modalCtrl.dismiss();
  }

  actualizarRest() {

    this.datos._id = this.idRestaurant._id;
    const data = this.datos;
    console.log('data: ',this.datos);

    this.resService.actualizarRestaurante({data}).then(resp => {

      if (resp) {
        //toast con mensaje actualizado
        this.uiservice.presentToast('Registro Actualizado');
        this.modalCtrl.dismiss();

      } else {
        //toast con error
        this.uiservice.presentToast('No se pudo actualizar')
      }

    });

  }

}
