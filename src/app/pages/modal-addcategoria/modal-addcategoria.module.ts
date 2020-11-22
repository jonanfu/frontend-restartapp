import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAddcategoriaPageRoutingModule } from './modal-addcategoria-routing.module';

import { ModalAddcategoriaPage } from './modal-addcategoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAddcategoriaPageRoutingModule
  ],
  declarations: [ModalAddcategoriaPage]
})
export class ModalAddcategoriaPageModule {}
