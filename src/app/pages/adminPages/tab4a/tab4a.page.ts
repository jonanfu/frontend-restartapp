import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { ModalController } from '@ionic/angular';
import { ModalPerfilComponent } from '../../modal-perfil-a/modal-perfil.component';
import { ModalRestauranteComponent } from '../../modal-restaurante/modal-restaurante.component';
import { ModalVerAdminComponent } from '../../modal-ver-admin/modal-ver-admin.component';
import { ModalVerRestauranteComponent } from '../../modal-ver-restaurante/modal-ver-restaurante.component';

@Component({
  selector: 'app-tab4a',
  templateUrl: './tab4a.page.html',
  styleUrls: ['./tab4a.page.scss'],
})
export class Tab4aPage implements OnInit {

  constructor(private usuarioServ: UsuarioService,
              private modalCtrlAdmin: ModalController) { }

  ngOnInit() {
  }
  
  cerrarSes(){
    this.usuarioServ.salir();
    
  }

  async modalPerfil(){
    const modal = await this.modalCtrlAdmin.create({component: ModalPerfilComponent});
    await modal.present();

  }

  async modalRestaurante(){
    const modal = await this.modalCtrlAdmin.create({component: ModalRestauranteComponent});
    await modal.present();
  }

  async verPerfil(){
    const modal = await this.modalCtrlAdmin.create({component: ModalVerAdminComponent});
    await modal.present();
  }

  async verRestaurante(){
    const modal = await this.modalCtrlAdmin.create({component: ModalVerRestauranteComponent });
    await modal.present()
  }

}
