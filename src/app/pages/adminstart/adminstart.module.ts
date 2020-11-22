import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminstartPageRoutingModule } from './adminstart-routing.module';

import { AdminstartPage } from './adminstart.page';
import { ModalAddcategoriaPageModule } from '../modal-addcategoria/modal-addcategoria.module';
import { ModalAddcategoriaPage } from '../modal-addcategoria/modal-addcategoria.page';

@NgModule({
  entryComponents:[
    ModalAddcategoriaPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminstartPageRoutingModule,
    ModalAddcategoriaPageModule
  ],
  declarations: [AdminstartPage]
})
export class AdminstartPageModule {}
