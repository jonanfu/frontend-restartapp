import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { ModalAddcategoriaPage } from '../modal-addcategoria/modal-addcategoria.page';
import { RestauranteService } from '../../services/restaurante.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminstart',
  templateUrl: './adminstart.page.html',
  styleUrls: ['./adminstart.page.scss'],
})
export class AdminstartPage implements OnInit {

  @ViewChild('slideNext',{static: true}) slides: IonSlides;

  constructor(public modaladduser: ModalController,
              private restaurante: RestauranteService,
              private storage: Storage, 
              private router: Router) { }


  ngOnInit() {
  }

  data = {
    nombreRes: '',
    ruc: '',
    telefono: '',
    ciudad: '',
    direccion: '',
    mesas: 0,
  }
  
  async addArticulo(){
    const modal = await this.modaladduser.create({
      component: ModalAddcategoriaPage
     });
    await modal.present();
  }

  async recogerData(){

    await this.restaurante.crearRestaurante( this.data ).then(  resp => {

      this.storage.set('adminStartFull', true);
      this.router.navigateByUrl('/main-admin/tabsa/tab1a')
      
    })

    console.log('data: ',this.data);
    
  }

  siguiente(){
    this.slides.slideNext()
  }


}
