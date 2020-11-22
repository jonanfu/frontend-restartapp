import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/interfacePedido';
import { UiService } from '../../services/ui.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-ver-admin',
  templateUrl: './modal-ver-admin.component.html',
  styleUrls: ['./modal-ver-admin.component.scss'],
})
export class ModalVerAdminComponent implements OnInit {

  usuario: any = {};

  constructor(private usuarioService: UsuarioService, private uiserv: UiService,
    private modalCtrl: ModalController) 
  {

  }

  async ngOnInit() {

    await this.usuarioService.getUsuario().then(resp => {
      
      this.usuario = resp['usuario']
     
    });
   
  }

  salir() {
    this.modalCtrl.dismiss();
  }

}
