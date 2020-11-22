import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPedido, Pedidos } from '../interfaces/interfacePedido';
import { RespuestaMenu } from '../interfaces/interfaceMenu';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';



const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  nuevoPedido = new EventEmitter<Pedidos>(); 
  token: string = '';

  //ESPECIAL
  private objectSuorce = new BehaviorSubject<any[]>([]);
  $getObjectSource = this.objectSuorce.asObservable();
  
  constructor(private http: HttpClient,
              private storage: Storage,
              private router: Router) 
  {
    this.cargarUser(); 
  }

  getPedidos(){

    return this.http.get<RespuestaPedido>(`${URL}/pedidos/obtenerpedidos`);

  }

  getMenu(){
    return this.http.get<RespuestaMenu>(`${URL}/menuarticulo/mostrarmenu`);
  }

  cargarUser() {
    this.storage.get('token').then( data => {
      this.token = data
    })
  }

  crearPedido( data ){
    
    const headers = new HttpHeaders({
      'x-token': this.token
    })
       
    return new Promise (resolve => {
      this.http.post( `${URL}/pedidos`, data, {headers}).subscribe( resp => {
        
        // console.log('resp: ', resp);
        this.nuevoPedido.emit( resp['pedidos'] );  
        resolve(true);
      })
    })
    
  }

  envíoDeTruePedido(data: any){

    //EN DATA YA ESTÁ EL _ID 
    this.http.post(`${URL}/pedidos/listoTrue`, data).subscribe( resp =>{

      // this.router.navigateByUrl('main-mesero/tabs/tab3')

    })  
  }


  borrarPedidoTomado(mesa: any){
    const headers = new HttpHeaders({
      'x-token': this.token
    })

    console.log('MESA: ',mesa);
    return new Promise ( resolve => {

      this.http.post(`${URL}/pedidos/borrarPed`, mesa, { headers }).subscribe( resp => {

        console.log('pedido quitado: ', resp);
        resolve(resp);
      })

    })

  }

  

}
