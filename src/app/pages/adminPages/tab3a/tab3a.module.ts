import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab3aPageRoutingModule } from './tab3a-routing.module';

import { Tab3aPage } from './tab3a.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab3aPageRoutingModule
  ],
  declarations: [Tab3aPage]
})
export class Tab3aPageModule {}
