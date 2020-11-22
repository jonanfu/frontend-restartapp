import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../../services/pedidos.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { UiService } from '../../../services/ui.service';

@Component({
  selector: 'app-tab1c',
  templateUrl: './tab1c.page.html',
  styleUrls: ['./tab1c.page.scss'],
})
export class Tab1cPage implements OnInit {

  pedido: any[] = [];
  vacio: boolean;

  constructor(private pedidosService: PedidosService,
    private alertCtrl: AlertController,
    private loading: LoadingController,
    private uiService: UiService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.presentLoading()

    this.pedido = [];
    this.pedidosService.getPedidos().subscribe(resp => {
      console.log("respuesta de pedidos: ", resp);
      this.pedido.push(...resp.pedido);
      this.pedido = this.pedido.filter(x => x.listo != true)
    });

    // this.comprobarVacio(this.pedido.length);

  }

  comprobarVacio(pedidoL) {
    if (pedidoL === 0) {
      console.log('length if: ', pedidoL);
      this.vacio = true;
    } else {
      console.log('length else: ', pedidoL);
      this.vacio = false;
    }
  }


  async presentLoading() {
    const loading = await this.loading.create({
      message: 'Cargando pedidos...',
    });
    await loading.present();
    this.loading.dismiss();
  }

  async enviarPed(item) {
    const alert = await this.alertCtrl.create({
      header: 'Envío',
      message: '¿Enviar pedido como listo?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
      }, {
        text: 'Aceptar',
        handler: () => {
          item.listo = true;
          this.pedidosService.envíoDeTruePedido(item);
          this.alertCtrl.dismiss();
        }
      }
      ]
    });
    await alert.present();
    await alert.onDidDismiss();
    setTimeout(()=>{
      this.ionViewWillEnter();
    },600)


  }

  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 1500);

  }



}
