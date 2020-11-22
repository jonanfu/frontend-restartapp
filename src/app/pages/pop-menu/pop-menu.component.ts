import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, NavParams} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-menu',
  templateUrl: './pop-menu.component.html',
  styleUrls: ['./pop-menu.component.scss'],
})
export class PopMenuComponent implements OnInit {
  @Input() item: any;

  constructor(public pop: PopoverController,
              private nav: NavParams,
              private router: Router) {

    this.nav.get('item'); 
  }
  ngOnInit() {}


  abrirModalImprimir(){
    this.pop.dismiss({imprimir: 'imprimir'})
  }
 
  eliminarPed(){
    this.pop.dismiss({eliminar:'eliminar'})
  }
}
