import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../../services/pedidos.service';
import { AlertController, LoadingController, PopoverController, ModalController } from '@ionic/angular';
import { PopMenuComponent } from '../../pop-menu/pop-menu.component';
import { ModalImprimirComponent } from '../../modal-imprimir/modal-imprimir.component';
import { UiService } from '../../../services/ui.service';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  pedido: any[] = [];
  pedidoTomado: any = '';


  constructor(private pedidosService: PedidosService,
              private loading: LoadingController,
              private pop: PopoverController,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private uiService: UiService) {

  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.pedido = [];

    this.presentLoading()

    this.pedidosService.getPedidos().subscribe(resp => {
      console.log("respuesta de pedidos: ", resp);
      this.pedido.push(...resp.pedido);
      this.pedido = this.pedido.filter(x => x.listo != false)
    });

    // if(this.pedido.length === 0 ){
    //   this.uiService.presentToast('No hay pedidos listos por el momento','warning')
    // }
  }

  async presentLoading() {
    const loading = await this.loading.create({
      message: 'Cargando pedidos...',
    });
    await loading.present();
    this.loading.dismiss();
  }

  async crearPop(event, item) {
    this.pedidoTomado = item;

    const popover = await this.pop.create({
      component: PopMenuComponent,
      componentProps: { 'item': item },
      mode: 'ios',
      event
    });
    await popover.present();
    const { data } = await popover.onWillDismiss();

    if (!data) {
      data: ''
    } else {
      this.sendData(data, this.pedidoTomado);
    }

  }

  sendData(data, item) {

    if(data.imprimir){
     
      this.imprimir(item);

    }else if (data.eliminar){

      this.eliminarAlert('Si ya ha generado una factura, puede quitar este pedido, ¿continuar?', 
      'Quitar pedido');

    }

  }

  async eliminarAlert(message: string, header: string){
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
      }, {
        text: 'Aceptar',
        handler: () => {
          
          this.borrarPedido(this.pedidoTomado)
          // console.log('eliminar: ',this.pedidoTomado);
        }
      }]
    });
    await alert.present();
  }


  async imprimir(item){
    // console.log('item a enviar:', item);
    
    const modal = await this.modalCtrl.create({
      component: ModalImprimirComponent,
      componentProps: {'item': item}
    });
    return await modal.present();
  }


  borrarPedido(item: any){
    // console.log('item mesa: ',item.mesa);
    const mesa  = item.mesa;
    this.pedidosService.borrarPedidoTomado({mesa}).then( resp => {
      console.log('respuesta del eliminado: ',resp);
      this.uiService.presentToast('Pedido quitado', 'primary')
      this.ionViewWillEnter()
    })
  }


  doRefresh(event){
    setTimeout(() => {
      this.ionViewWillEnter();

      event.target.complete();
    }, 1500);

  }


}

