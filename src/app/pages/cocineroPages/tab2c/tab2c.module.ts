import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab2cPageRoutingModule } from './tab2c-routing.module';

import { Tab2cPage } from './tab2c.page';
import { ModalPerfilCComponent } from '../../modal-perfil-c/modal-perfil-c.component';
import { ModalVerCociComponent } from '../../modal-ver-coci/modal-ver-coci.component';



@NgModule({
  entryComponents:[ModalPerfilCComponent, ModalVerCociComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab2cPageRoutingModule,
  ],
  declarations: [Tab2cPage, ModalPerfilCComponent,ModalVerCociComponent]
})
export class Tab2cPageModule {}
