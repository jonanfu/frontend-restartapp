import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab2aPageRoutingModule } from './tab2a-routing.module';

import { Tab2aPage } from './tab2a.page';
import { PopmenuCatComponent } from '../../popmenu-cat/popmenu-cat.component';


@NgModule({
  entryComponents:[ PopmenuCatComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab2aPageRoutingModule
  ],
  declarations: [Tab2aPage, PopmenuCatComponent]
})
export class Tab2aPageModule {}
