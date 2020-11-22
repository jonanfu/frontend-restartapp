import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAddcategoriaPage } from './modal-addcategoria.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAddcategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAddcategoriaPageRoutingModule {}
