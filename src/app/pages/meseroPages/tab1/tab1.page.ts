import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../../services/pedidos.service';
import { Pedidos } from '../../../interfaces/interfacePedido';
import { ModalController, PopoverController, LoadingController } from '@ionic/angular';
import { ModalTomaPage } from '../../modal-toma/modal-toma.page';
import { PopMenuComponent } from '../../pop-menu/pop-menu.component';
import { UiService } from '../../../services/ui.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

  pedido: any[] = [];

  constructor(private pedidosService: PedidosService,
    private modalCtrl: ModalController,
    private loading: LoadingController,
    private uiService: UiService) {
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.pedido = [];
    this.presentLoading()

    this.pedidosService.getPedidos()
      .subscribe(resp => {
        console.log('respuesta de pedidos: ', resp);
        this.pedido.unshift(...resp.pedido);
        this.pedido = this.pedido.filter(x => x.listo != true)
      });

    this.pedidosService.cargarUser()
  }

  async presentLoading() {
    const loading = await this.loading.create({
      message: 'Cargando pedidos...',
    });
    await loading.present();
    this.loading.dismiss()

  }

  async abrirModal() {

    const modal = await this.modalCtrl.create({
      component: ModalTomaPage
    });
    await modal.present();
    await modal.onDidDismiss();
    setTimeout(()=>{
      this.ionViewWillEnter();
    },600)


  }

  doRefresh(event) {
    setTimeout(() => {
  event.target.complete();
this.ionViewWillEnter();

    }, 1500);

  }


} 