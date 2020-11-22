import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab1cPageRoutingModule } from './tab1c-routing.module';

import { Tab1cPage } from './tab1c.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab1cPageRoutingModule,

  ],
  declarations: [Tab1cPage]
})
export class Tab1cPageModule {}
