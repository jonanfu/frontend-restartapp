import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab2aPage } from './tab2a.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2aPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab2aPageRoutingModule {}
