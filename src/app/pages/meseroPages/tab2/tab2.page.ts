import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../../services/pedidos.service';
import { Plato } from '../../../interfaces/interfaceMenu';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  plato: Plato [] = [];
  constructor(private pedidosService: PedidosService) {}

  ngOnInit(){
    this.pedidosService.getMenu().subscribe(resp => {
      // console.log("Respuesta del getMenú", resp);
      this.plato.push(...resp.plato);
    });
  }

  today = Date.now();
}
