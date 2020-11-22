import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab1aPage } from './tab1a.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1aPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1aPageRoutingModule {}
