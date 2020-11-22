import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4aPageRoutingModule } from './tab4a-routing.module';

import { Tab4aPage } from './tab4a.page';
import { ModalPerfilComponent } from '../../modal-perfil-a/modal-perfil.component';
import { ModalRestauranteComponent } from '../../modal-restaurante/modal-restaurante.component';
import { ModalVerAdminComponent } from '../../modal-ver-admin/modal-ver-admin.component';
import { ModalVerRestauranteComponent } from '../../modal-ver-restaurante/modal-ver-restaurante.component';


@NgModule({
  entryComponents:[
    ModalPerfilComponent,
    ModalRestauranteComponent,
    ModalVerAdminComponent,
    ModalVerRestauranteComponent,
    

  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4aPageRoutingModule
  ],
  declarations: [Tab4aPage, ModalPerfilComponent, ModalRestauranteComponent,ModalVerAdminComponent, ModalVerRestauranteComponent]
})
export class Tab4aPageModule {}
