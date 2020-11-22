import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabscPage } from './tabsc.page';

const routes: Routes = [
  {
    path: 'tabsc',
    component: TabscPage,
    children: [

      {
        path: 'tab1c',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1c/tab1c.module').then(m => m.Tab1cPageModule)
          }
        ]
      },
      {
        path: 'tab2c',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2c/tab2c.module').then(m => m.Tab2cPageModule)
          }
        ]
      },
      
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabscPageRoutingModule {}
