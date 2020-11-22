import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsaPageRoutingModule } from './tabsa-routing.module';

import { TabsaPage } from './tabsa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsaPageRoutingModule
  ],
  declarations: [TabsaPage]
})
export class TabsaPageModule {}
