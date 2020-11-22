import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ModalTomaPageModule } from '../../modal-toma/modal-toma.module';
import { ModalTomaPage } from '../../modal-toma/modal-toma.page';



@NgModule({
  entryComponents:[ ModalTomaPage ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ModalTomaPageModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])

  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
