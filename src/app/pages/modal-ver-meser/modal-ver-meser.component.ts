import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { UiService } from '../../services/ui.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-ver-meser',
  templateUrl: './modal-ver-meser.component.html',
  styleUrls: ['./modal-ver-meser.component.scss'],
})

export class ModalVerMeserComponent implements OnInit {

  usuario: any = {};

  constructor(private usuarioService: UsuarioService, 
              private uiserv: UiService,
              private modalCtrl: ModalController) 
  {
    
  }

  async ngOnInit() {

    await this.usuarioService.getUsuario().then(resp => {      
      this.usuario = resp['usuario'];     
    });
   
  }

  salir() {
    this.modalCtrl.dismiss();
  }

}
