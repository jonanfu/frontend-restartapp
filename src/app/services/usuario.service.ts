import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Usuario, Pedidos } from '../interfaces/interfacePedido';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;

  user: Observable<any>;
  rolesArr: any[] = [];
  resultado: boolean;

  private authState = new BehaviorSubject(null);

  rol: string = '';

  constructor(private http: HttpClient,
    private storage: Storage,
    private router: Router,
    private navCtrl: NavController) {

    this.setRoles();
    this.cargarUser();

    this.user = this.authState.asObservable().pipe(
      filter(response => response)
    )
  }

  login(email: string, contrasena: string) {

    const data = { email, contrasena };

    let user = null;
    return new Promise(resolve => {

      this.http.post(`${URL}/user/login`, data).subscribe(async resp => {

        console.log('resp: ', resp);

        this.setRol(resp['rol']);

        if (resp['ok']) {

          if (this.rol === 'mesero') {

            user = { email, rol: 'mesero' }

          } else if (this.rol === 'cocinero') {

            user = { email, rol: 'cocinero' }

          } else if (this.rol = 'gerente') {

            user = { email, rol: 'gerente' }

          }
          this.authState.next(user);
          await this.guardarToken(resp['token']);

          resolve(true);
        } else {
          this.token = null;
          this.storage.set('token', null);
          resolve(false);
        }

      }
      );

    });

  }

  async registro(nombre: string, apellido: string, rol: string, email: string, contrasena: string) {

    const data = { nombre, apellido, rol, email, contrasena }
    let user = null;

    await this.setRoles();

    return new Promise(resolve => {

      if (rol === 'gerente' && this.resultado === false) {

        this.http.post(`${URL}/user/create`, data).subscribe(async resp => {

          if (resp['ok']) {

            if (this.rol = 'gerente') {

              this.storage.set('gerente', true);
              this.resultado = true;
              user = { email, rol: 'gerente' }

            }

            this.authState.next(user);
            await this.guardarToken(resp['token']);
            resolve(true);

          } else {

            this.token = null;
            this.storage.set('token', null);
            resolve(false);

          }

        });

      } else if (rol === 'gerente' && this.resultado === true) {

        this.storage.set('gerente', true);
        this.resultado = true;
        resolve(false);

      } else if (rol != 'gerente') {

        this.http.post(`${URL}/user/create`, data).subscribe(async resp => {

          if (resp['ok']) {

            //Eliminar lo siguientes campos
            if (this.rol === 'mesero') {
              user = { email, rol: 'mesero' }
            } else if (this.rol === 'cocinero') {
              user = { email, rol: 'cocinero' }
            }

            this.authState.next(user);
            await this.guardarToken(resp['token']);
            resolve(true);

          } else {

            this.token = null;
            this.storage.set('token', null);
            resolve(false);

          }

        });

      }



    });
  }


  updateUser(usuario: Usuario) {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise(resolve => {

      this.http.post(`${URL}/user/update`, usuario, { headers })
        .subscribe(resp => {

          if (resp['ok']) {
            this.guardarToken(resp['token']);

            resolve(true);
          } else {
            resolve(false);
          }

        })
    }).catch(err => console.log(err))

  }

  setRoles() {

    return new Promise(resolve => {
      this.http.get(`${URL}/user/getRol`).subscribe(resp => {

        this.rolesArr = resp['rol']

        if (this.rolesArr.find(x => x.rol === 'gerente')) {

          this.resultado = true;
          this.storage.set('gerente', true)
          resolve(true);

        } else {

          this.resultado = false;
          this.storage.set('gerente', false)

          resolve(false);
        }

      })
    })

  }

  async salir() {

    this.storage.set('token', null);
    this.authState.next(null);
    this.router.navigateByUrl('/login');

  }

  setRol(rol: string) {
    this.rol = rol;
    // console.log('ROL: ',rol);
  }

  async guardarToken(token: string) {

    this.token = token;
    await this.storage.set('token', token);

  }

  cargarUser() {
    this.storage.get('token').then(data => {
      console.log('Usuario cargado: ', { data })
      if (data) {
        this.authState.next(data);
        this.token = data
      } else {
        this.authState.next({ email: null, role: null })
        console.log('token null');
      }
    })
  }

  getUsuarios() {
    return this.http.get<Pedidos>(`${URL}/user/getUsuarios`);
  }

  //TRAER USUARIOS
  getUsuario() {
    // console.log('token: ',this.token);
    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise(resolve => {
      this.http.get<Usuario>(`${URL}/user`, { headers }).subscribe(resp => {
        console.log('que envio: ', resp);

        resolve(resp);
      })
    })

  }


  //BORRAR PERSONAL
  borrarPersonal(email) {

    return new Promise(resolve => {
      this.http.post(`${URL}/user/borrarUser`, email).subscribe(resp => {

        resolve(true);
      })
    })

  }


}
