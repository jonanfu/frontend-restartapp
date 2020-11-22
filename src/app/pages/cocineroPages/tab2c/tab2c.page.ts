import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { ModalController } from '@ionic/angular';
import { ModalPerfilCComponent } from '../../modal-perfil-c/modal-perfil-c.component';
import { ModalVerCociComponent } from '../../modal-ver-coci/modal-ver-coci.component';

@Component({
  selector: 'app-tab2c',
  templateUrl: './tab2c.page.html',
  styleUrls: ['./tab2c.page.scss'],
})
export class Tab2cPage implements OnInit {

  constructor(private usuarioService: UsuarioService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  cerrarSes(){
    this.usuarioService.salir();
    
  }
  async actualizar(){
    const modal = await this.modalCtrl.create({
      component: ModalPerfilCComponent
    });
    await modal.present();
    
  }
  async verPerfil(){
    const modal = await this.modalCtrl.create({
      component: ModalVerCociComponent
    });
    await modal.present();
  }

}
