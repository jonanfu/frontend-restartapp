import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UiService } from '../../services/ui.service';
import { RestauranteService } from '../../services/restaurante.service';

@Component({
  selector: 'app-modal-addcategoria',
  templateUrl: './modal-addcategoria.page.html',
  styleUrls: ['./modal-addcategoria.page.scss'],
})
export class ModalAddcategoriaPage implements OnInit {

  constructor(private modalCtrl: ModalController,
              private uiservice: UiService,
              private restaurante: RestauranteService) { }

  arts = {
    nombreCat: '',
    articulos:
    {
      nombreArt: '',
      precio: 0
    }

  }

  ngOnInit() {
  }

  cerrarMod() {
    this.modalCtrl.dismiss()
  }

  agregarCat() {
    //ERROR
    if (this.arts.nombreCat === undefined || this.arts.nombreCat === '') {//aqui

      this.uiservice.alertaInformativa('Debe completar todos los campos', 'Error al crear la categoría')

    } else {

      this.restaurante.crearCategoria(this.arts)
      this.uiservice.alertaInformativa('Categoría creada')
      this.modalCtrl.dismiss()

    }

  }

}
