import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab4aPage } from './tab4a.page';

const routes: Routes = [
  {
    path: '',
    component: Tab4aPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab4aPageRoutingModule {}
