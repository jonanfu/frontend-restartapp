import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../interfaces/interfacePedido';
import { AlertController } from '@ionic/angular';
import { UiService } from '../../../services/ui.service';


@Component({
  selector: 'app-tab3a',
  templateUrl: './tab3a.page.html',
  styleUrls: ['./tab3a.page.scss'],
})
export class Tab3aPage implements OnInit {

  constructor(private usuarioService: UsuarioService,
    private alertCtrl: AlertController,
    private uiService: UiService) { }

  usuario: Usuario[] = [];


  ngOnInit() {
    this.usuario = []

    this.usuarioService.getUsuarios()
      .subscribe(resp => {
        console.log('respuesta de users-pedidos: ', resp);
        this.usuario.push(...resp.usuario)
        this.usuario = this.usuario.filter(x => x.rol != 'gerente')
      }
      )
  }

  async confirmEliminarAlert(email) {
    console.log('email que viene: ',email);

    const alert = await this.alertCtrl.create({
      header: 'Eliminar personal',
      message: '¿Está seguro de eliminar al usuario?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
      }, {
        text: 'Aceptar',
        handler: () => {
          this.eliminarUser(email);
          
        }
      }
      ]

    });
    await alert.present();
  }

  eliminarUser(email: any) {
 
    console.log('email en el método: ', email);

    this.usuarioService.borrarPersonal({email}).then(x => {
      console.log('usuario eliminado');
      this.ngOnInit();

      this.uiService.presentToast('Se ha eliminado un usuario', 'warning')

    });

  }



}
