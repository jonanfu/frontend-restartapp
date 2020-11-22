import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Restaurante } from '../interfaces/interfaceRestaurante';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})


export class RestauranteService {

  nombreCat: any = '';
  constructor(private http: HttpClient) { }

  //TRAER LOS DATOS DEL RESTAURANTE
  traerRestaurante(){
    return new Promise( resolve => {

      this.http.get<Restaurante>(`${URL}/restaurante/getDataRestaurante`).subscribe( resp =>{
        
        console.log('respuesta: ',resp);
        resolve(resp)
      });
      
    }) 
    
  }


  //CREAR RESTAURANTE
  crearRestaurante(data) {
    return new Promise(resolve => {

      this.http.post(`${URL}/restaurante/createRes`, data).subscribe(resp => {

        console.log('respuesta de la creación restaurante: ', resp);
        resolve(true);
      })
    })
  }

  //CREAR CATEGORÍA
  crearCategoria(data) {

    return new Promise(resolve => {

      this.http.post(`${URL}/menuarticulo`, data).subscribe(resp => {

        console.log('respuesta de la categoría: ', resp);
        resolve(true);

      })

    })


  }

  envioCat(nombreCat: any) {
    this.nombreCat = nombreCat;
    // console.log('Se recibió: ',this.nombreCat);
  }

  //ELIMINAR CATEGORÍA
  eliminarCat(nombreCat) {

    console.log('que viene: ',nombreCat);
    return new Promise(resolve => {

      this.http.post(`${URL}/menuarticulo/borrarCat`, nombreCat).subscribe(resp => {

        console.log('respuesta de la eliminación: ', resp);
        resolve(true);

      })

    })

  }

  //ACTUALIZAR NOMBRE DE CATEGORÍA
  actualizarCat(nombreCat: string, _id: any) {

    const data = {
      nombreCat: nombreCat,
      _id: _id
    }

    return new Promise(resolve => {

      this.http.post(`${URL}/menuarticulo/updateCat`, data).subscribe(resp => {
        console.log('respuesta de la actualización: ', resp);
        resolve(true);
      })

    })

  }

  //BORRAR UN ARTÍCULO
  borrarArt(nombreCat: string, nombreArt: string) {

    const data = {
      nombreCat: nombreCat,
      nombreArt: nombreArt
    }

    return new Promise(resolve => {
      this.http.post(`${URL}/menuarticulo/borrar`, data).subscribe(resp => {
        console.log('borrado!');
        resolve(true);
      })
    });
  }

  //AGREGAR UN ARTÍCULO A UNA CATEGORÍA
  agregarArts(nomCat: string, nomArt: string, precio: number) {

    const data = {
      nombreCat: nomCat,
      nombreArt: nomArt,
      precio: precio
    }
    return new Promise(resolve => {

      this.http.post(`${URL}/menuarticulo/agregar`, data).subscribe(resp => {

        console.log('Agregado a la categoría: ', data.nombreCat);
        resolve(true);
      })

    })

  }

  //ACTUALIZAR RESTAURANTE
  actualizarRestaurante(restaurante: any){

    const dataNew = {
      nombreRes: restaurante.nombreRes,
      ruc: restaurante.ruc,
      telefono: restaurante.telefono,
      ciudad: restaurante.ciudad,
      direccion: restaurante.direccion,
      mesas: restaurante.mesas
    }
  
    return new Promise( resolve => {

      this.http.post(`${URL}/restaurante/updateRes`, dataNew).subscribe( resp => {
        console.log('Restaurante actualizado ', resp);
        resolve(true);
      })

    }).catch(err=> console.log(err))
  }

}