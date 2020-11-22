import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { PopMenuComponent } from '../../pop-menu/pop-menu.component';
import { ModalImprimirComponent } from '../../modal-imprimir/modal-imprimir.component';


@NgModule({
  entryComponents:[PopMenuComponent, ModalImprimirComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  declarations: [Tab3Page,PopMenuComponent, ModalImprimirComponent]
})


export class Tab3PageModule {}
