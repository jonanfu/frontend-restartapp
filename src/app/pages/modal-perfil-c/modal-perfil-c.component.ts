import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-modal-perfil-c',
  templateUrl: './modal-perfil-c.component.html',
  styleUrls: ['./modal-perfil-c.component.scss'],
})
export class ModalPerfilCComponent implements OnInit {

  data = {
    nombre: '',
    apellido: '',
    email: ''
  }

  constructor(private modalCtrl: ModalController,
              private usuarioService: UsuarioService,
              private uiService: UiService) { }

  ngOnInit() {}

  salir() {
    this.modalCtrl.dismiss();
  }

  actualizarData(){
    this.usuarioService.updateUser(this.data).then( resp => {

      if (resp){
        this.uiService.presentToast('Actualizado correctamente')
        this.modalCtrl.dismiss()
      }else{
        this.uiService.presentToast('No se pudo actualizar')
          
      }      
    })
  }
}
