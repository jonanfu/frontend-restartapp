import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab3aPage } from './tab3a.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3aPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab3aPageRoutingModule {}
