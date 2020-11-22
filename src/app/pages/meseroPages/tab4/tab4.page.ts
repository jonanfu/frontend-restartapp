import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { ModalController } from '@ionic/angular';
import { ModalPerfilMComponent } from '../../modal-perfil-m/modal-perfil-m.component';
import { ModalVerMeserComponent } from '../../modal-ver-meser/modal-ver-meser.component';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private usuarioServ: UsuarioService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  cerrarSes(){
    this.usuarioServ.salir();
  }

  async actualizar(){
    const modal = await this.modalCtrl.create({
      component: ModalPerfilMComponent
    });
    await modal.present();
    
  }

  async verPerfil(){
    const modal = await this.modalCtrl.create({component: ModalVerMeserComponent});
    await modal.present();
  }

  
}
