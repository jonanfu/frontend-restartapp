import { Component, OnInit, Input } from '@angular/core';
import { Plato } from '../../../interfaces/interfaceMenu';
import { PedidosService } from '../../../services/pedidos.service';
import { PopoverController, AlertController } from '@ionic/angular';
import { PopmenuCatComponent } from '../../popmenu-cat/popmenu-cat.component';
import { RestauranteService } from '../../../services/restaurante.service';


@Component({
  selector: 'app-tab2a',
  templateUrl: './tab2a.page.html',
  styleUrls: ['./tab2a.page.scss'],
})
export class Tab2aPage implements OnInit {

  plato: Plato[] = []

  categ: string = '';
  _id: string = '';
  nombreCat: string = '';

  nombreArt: string = '';
  precio: number = 0;
  
  constructor(private pedidos: PedidosService,
              private popCtrl: PopoverController,
              private restaurante: RestauranteService,
              private alertCtrl: AlertController) 
  { }

  ngOnInit() {
    this.plato = [];
    this.pedidos.getMenu().subscribe(resp => {
      console.log("respuesta de pedidos: ", resp);
      this.plato.push(...resp.plato);
    });
  }

  
  async crearPop(evento, plat: any) {
    this.categ = plat.nombreCat
    this._id = plat._id;

    const popover = await this.popCtrl.create({
      component: PopmenuCatComponent,
      event: evento,
      mode: 'ios',
      backdropDismiss: true
    });
    await popover.present();

    const { data } = await popover.onWillDismiss();
    // console.log('padrexd: ',data);
    if (data === undefined) {
      data: ''
    } else {
      this.sendData(data);
    }
  }

  sendData(data) {
    if (data.Eliminar) {

      this.confirmEliminarAlert('¿Está seguro que desea eliminar la categoría?', 'Eliminación de categoría');

    } else if (data.Cambiar === 'cambiar') {
      //Llamar al servicio de cambiar nombre
      this.cambiarNombreAlert('Actualizar');

    } else if (data.Agregar === 'agregar') {

      this.masArticulosAlert(this.categ)
    }
  }

  async confirmEliminarAlert(message: string, header?: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
      }, {
        text: 'Aceptar',
        handler: () => {
          
          this.eliminarCat(this.categ)
          
        }
      }]
    });
    await alert.present();
  }

  eliminarCat(nombreCat?: any) {
    

    this.restaurante.eliminarCat({ nombreCat }).then(resp => {
      console.log('CATEGORÍA ELIMINADA');
      this.ngOnInit()
    });

  }


  //Cambiar nombre de la categoría
  async cambiarNombreAlert(header?: string) {
    const alert = await this.alertCtrl.create({
      header,
      inputs: [
        {
          name: 'nombreCat',
          placeholder: 'Edite el nombre'
        }
      ],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
      }, {
        text: 'Aceptar',
        handler: (alertData) => {
          this.nombreCat = alertData['nombreCat'];
          this.actualizarCat(this.nombreCat);

        }
      }
      ]

    });
    await alert.present();
  }


  actualizarCat(nombreCat: string) {

    this.restaurante.actualizarCat(nombreCat, this._id).then(resp => {
      this.ngOnInit()
      console.log('CAMBIADO CON ÉXITO', resp);
    })

  }


  borrarArt(plat, item) {
    const nomCat = plat.nombreCat;
    const nomArt = item.nombreArt;

    console.log('Cat: ', nomCat, 'Art: ', nomArt);
    this.restaurante.borrarArt(nomCat, nomArt);

  }

  async masArticulosAlert(nombreCat) {
    const alert = await this.alertCtrl.create({
      header: 'Ingrese más artículos en',
      message: nombreCat,
      inputs: [
        {
          name: 'nombreArt',
          type: 'text',
          placeholder: 'Nombre del artículo'
        },
        {
          name: 'precio',
          type: 'number',
          min: 0,
          placeholder: 'Precio del artículo'
        }
      ],
      
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
      }, {
        text: 'Aceptar',
        handler: (alertData) => {
          this.nombreCat = nombreCat;
          this.nombreArt = alertData['nombreArt'];
          this.precio = alertData['precio'];

          this.addMasArticulos(this.nombreCat, this.nombreArt, this.precio);

        }
      }
      ]

    });
    await alert.present();
  }

  addMasArticulos(nomCat, nomArt, precio) {
    console.log('nombreCat: ', nomCat, 'nombreArt: ', nomArt, 'precio: ', precio);
    this.restaurante.agregarArts(nomCat, nomArt, precio).then( resp => {
      // console.log('yeii');
      this.ngOnInit()
    });
  }

  async agregarNueva(){
    const alert = await this.alertCtrl.create({
      header: 'Nuevo plato',
      inputs: [
        {
          name: 'nombreCat',
          type: 'text',
          placeholder: 'Nombre de la categoría'
        },
        {
          name: 'nombreArt',
          type: 'text',
          placeholder: 'Nombre del artículo'
        },
        {
          name: 'precio',
          type: 'number',
          min: 0,
          placeholder: 'Precio del artículo'
        }
      ],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
      }, {
        text: 'Aceptar',
        handler: (alertData) => {
          this.nombreCat = alertData['nombreCat'];
          this.nombreArt = alertData['nombreArt'];
          this.precio = alertData['precio'];

          this.crearCategoria(this.nombreCat, this.nombreArt, this.precio);

        }
      }
      ]

    });
    await alert.present();
  }


  crearCategoria(nombreCat, nombreArt, precio){
    const arts = {
      nombreCat: nombreCat || '', 
      articulos:
      {
        nombreArt: nombreArt || '',
        precio: precio || 0
      }
  
    }
    this.restaurante.crearCategoria(arts).then(resp => {
      console.log('creado wn');
      this.ngOnInit()
    })

  }
}
