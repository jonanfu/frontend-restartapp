import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminstartPage } from './adminstart.page';

const routes: Routes = [
  {
    path: '',
    component: AdminstartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminstartPageRoutingModule {}
