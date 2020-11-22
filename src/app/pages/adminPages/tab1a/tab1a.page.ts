import { Component, OnInit } from '@angular/core';
import { Pedidos } from '../../../interfaces/interfacePedido';
import { PedidosService } from '../../../services/pedidos.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab1a',
  templateUrl: './tab1a.page.html',
  styleUrls: ['./tab1a.page.scss'],
})
export class Tab1aPage implements OnInit {

  pedido: any[] = [];

  constructor(private pedidosService: PedidosService, 
              private loading: LoadingController) { }

  ionViewWillEnter() {
    this.pedido = [];
    this.presentLoading()
    this.pedidosService.getPedidos()
      .subscribe(resp => {
        console.log('respuesta de pedidos: ', resp.pedido);

        this.pedido.push(...resp.pedido);
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

  ngOnInit() {

  }
  doRefresh(event){
    setTimeout(() => {
      this.ionViewWillEnter();

      event.target.complete();
    }, 1500);

  }


}
