import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsaPage } from './tabsa.page';

const routes: Routes = [
  {
    path: 'tabsa',
    component: TabsaPage,
    children: [

      {
        path: 'tab1a',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1a/tab1a.module').then(m => m.Tab1aPageModule)
          }
        ]
      },
      {
        path: 'tab2a',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2a/tab2a.module').then(m => m.Tab2aPageModule)
          }
        ]
      },
      {
        path: 'tab3a',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab3a/tab3a.module').then(m => m.Tab3aPageModule)
          }
        ]
      },
      {
        path: 'tab4a',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab4a/tab4a.module').then(m => m.Tab4aPageModule)
          }
        ]
      },
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsaPageRoutingModule {}
