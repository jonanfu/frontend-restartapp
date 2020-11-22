import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { ModalTomaPage } from '../../modal-toma/modal-toma.page';
import { ModalTomaPageModule } from '../../modal-toma/modal-toma.module';


@NgModule({
  entryComponents:[
    ModalTomaPage
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ModalTomaPageModule,
    TabsPageRoutingModule,
    
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
