import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-modal-perfil',
  templateUrl: './modal-perfil.component.html',
  styleUrls: ['./modal-perfil.component.scss'],
})
export class ModalPerfilComponent implements OnInit {

  datos = {
    nombre: '',
    apellido: '',
    email: '',
  } 
  

  constructor(private modalCtrl: ModalController,
              private usuarioService: UsuarioService,
              private uiservice: UiService) {}

  ngOnInit() {}

  async salir() {
    this.modalCtrl.dismiss();
  }

  actualizacion(){
    
    this.usuarioService.updateUser(this.datos).then( resp => {
      if ( resp ){
        //toast con mensaje actualizado
        this.uiservice.presentToast('Registro Actualizado');
        this.modalCtrl.dismiss();
  
      }else{
        //toast con error
        this.uiservice.presentToast('No se pudo actualizar')
      }

    })

  }

}
