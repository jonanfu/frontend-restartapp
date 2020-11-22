import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { Tab4Page } from './tab4.page';
import { ModalPerfilMComponent } from '../../modal-perfil-m/modal-perfil-m.component';
import { ModalVerMeserComponent } from '../../modal-ver-meser/modal-ver-meser.component';

@NgModule({
  entryComponents:[ModalPerfilMComponent, ModalVerMeserComponent],

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: Tab4Page }])
  ],
  declarations: [Tab4Page, ModalPerfilMComponent, ModalVerMeserComponent]
})
export class Tab4PageModule {}
