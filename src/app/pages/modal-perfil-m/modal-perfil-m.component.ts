import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiService } from '../../services/ui.service';


@Component({
  selector: 'app-modal-perfil-m',
  templateUrl: './modal-perfil-m.component.html',
  styleUrls: ['./modal-perfil-m.component.scss'],
})
export class ModalPerfilMComponent implements OnInit {

  constructor(private modalCtrl: ModalController,
              private usuarioService: UsuarioService,
              private uiService: UiService) { }

  data = {
    nombre: '',
    apellido: '',
    email: ''
  }

  ngOnInit() {}

  salir() {
    this.modalCtrl.dismiss();
  }

  actualizarData(){
    

    this.usuarioService.updateUser(this.data).then( resp => {
      console.log('creado?, ',resp);

      if (resp){
        this.uiService.presentToast('Actualizado correctamente')
        this.modalCtrl.dismiss()
      }else{
        this.uiService.presentToast('No se pudo actualizar')
          
      }      
    })
  }


}
