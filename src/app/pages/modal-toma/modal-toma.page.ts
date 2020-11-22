import { Component, OnInit, Input } from "@angular/core";
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { PedidosService } from "../../services/pedidos.service";
import { Plato, Articulo } from '../../interfaces/interfaceMenu';


@Component({
  selector: "app-modal-toma",
  templateUrl: "./modal-toma.page.html",
  styleUrls: ["./modal-toma.page.scss"]
})
export class ModalTomaPage implements OnInit {

  pedido = {

    mesa: 0,
    nombrePlato_Precio: [], //Aquí va el temp -->
    notas: 'Ninguna',
    precioTotal: 0,
    listo: false

  }

  temp = {
    nombreArt: '',
    precio: 0,
    cantidad: 0
  }


  constructor(private modalCtrl: ModalController,
    private pedidosService: PedidosService,
    private alertCtrl: AlertController
  ) {

    this.pedidosService.getMenu().subscribe(resp => {
      this.plato.push(...resp.plato);
    });
  }

  

  plato: Plato[] = [];
  articulos: Articulo[] = [];
  cantidad = 0;

  ngOnInit() { }


  aumentar(item: Articulo) {

    if (isNaN(item.cantidad) || item.cantidad === undefined) {

      item.cantidad = 1;
      this.llenarArr(item)
    } else {

      item.cantidad++;
      this.llenarArr(item)
    }

  }

  disminuir(item: Articulo) {

    if (isNaN(item.cantidad)) {

      item.cantidad = this.cantidad;

    } else if (item.cantidad > 0) {

      item.cantidad--;
      this.llenarArr(item)
    }
  }

  llenarArr(item: Articulo) {

    // console.log('item: ',item);
    
    this.pedido.nombrePlato_Precio.push(item)
    // console.log('arr: ', this.pedido.nombrePlato_Precio);

  }

  async cerrarModal() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      animated: true,
      message: '¿Está seguro de que desea cancelar la toma de pedido?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',

        }, {
          text: 'Aceptar',
          role: 'ok',
          handler: () => {
            this.modalCtrl.dismiss();

          }
        }
      ]
    });

    await alert.present();
  }

  async enviarAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      animated: true,
      message: '¿Está todo listo para enviar el pedido?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',

        }, {
          text: 'Aceptar',
          role: 'ok',
          handler: () => {
            this.enviarDatos();
            this.modalCtrl.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }


  async enviarDatos(temp?: any) {

    var hash = {};
    //Eliminar artículos repetidos
    this.pedido.nombrePlato_Precio = this.pedido.nombrePlato_Precio.filter( 
       x => {
        var existe  = !hash[x._id] || false;
        hash[x._id] = true;
        return existe;
      }
    )
    // console.log('SIN ELEMENTOS REPETIDOS: ',this.pedido.nombrePlato_Precio);
    //Eliminar artículos con cantidad = 0

    this.articulos = this.pedido.nombrePlato_Precio.filter( x => x.cantidad !== 0 )
    // console.log('this.articulos: ', this.articulos); 
    this.pedido.nombrePlato_Precio = this.articulos;

    await this.preTotal(this.pedido.nombrePlato_Precio)
    const envio = await this.pedidosService.crearPedido(this.pedido).then(ped => {
    
    })

  }
  total: number = 0  ;

  preTotal(arreglo: any []){
    
    arreglo.forEach( pos => {

      const precio = pos.precio
      const cantidad = pos.cantidad

      const total = precio * cantidad;
      this.total = this.total + total;

      // console.log('precio: ',precio,' cantidadxd: ', cantidad, 'pre total arts: ', total);
      
    })
    this.pedido.precioTotal = this.total;
    console.log('Total total: ',this.total)

  }

  async salir() {
    await this.cerrarModal();
  }
  async prepareEnvio() {
    await this.enviarAlert();
  }

}
