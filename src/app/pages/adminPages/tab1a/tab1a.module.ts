import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab1aPageRoutingModule } from './tab1a-routing.module';

import { Tab1aPage } from './tab1a.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab1aPageRoutingModule
  ],
  declarations: [Tab1aPage]
})
export class Tab1aPageModule {}
