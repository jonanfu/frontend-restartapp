import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonSlides } from '@ionic/angular';

import { UiService } from '../../services/ui.service';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/interfacePedido';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;

  loginUser = {
    email: '',
    contrasena: ''
  };

  registerUser: Usuario = {
    nombre: '',
    apellido: '',
    rol: '',
    email: '',
    contrasena: ''
  }

  rol: string = '';

  constructor(private usuarioService: UsuarioService,
    private storage: Storage,
    private UiService: UiService,
    private router: Router) { }


  ngOnInit() {
    this.slides.lockSwipes(true);
    //Aqui tienen que ir el getRoles
    this.getCompleted()
  }

  opcionesSelec: any = {
    header: 'Roles de personal',
    subHeader: 'Seleccione su rol a desempeñar'
  }
  rolesUser: any[] = [
    {
      id: 1,
      rol: 'Mesero'
    },

    {
      id: 2,
      rol: 'Cocinero'
    },
    {
      id: 3,
      rol: 'Gerente'
    },

  ];

  onChange(event) {
    this.rol = event.target.value;
    // console.log("seleccionado: ",this.rol);
  }

  complet: boolean = false;

  async getCompleted() {

    await this.storage.get('adminStartFull').then(data => {

      if (data === true) {

        this.complet = data

      } else {

        this.storage.set('adminStartFull', false);

      }

    })

  }

  async verifiLog() {
    this.getCompleted();

    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.contrasena)
      .then(user => {

        this.rol = this.usuarioService.rol || '';
        if (this.rol === 'gerente') {

          if (this.complet === true) {
            this.router.navigateByUrl('/main-admin/tabsa/tab1a');
          } else {
            this.router.navigateByUrl('/adminstart');
          }

        } else if (this.rol == 'mesero') {
          this.router.navigateByUrl('/main-mesero/tabs/tab1')
          console.log('ingresado como mesero');

        } else if (this.rol === 'cocinero') {
          this.router.navigateByUrl('main-cocinero/tabsc/tab1c')
          console.log('ingresado como cocinero');

        } else {
          //mostrar alerta de usuario y contraseña correcto
          this.UiService.alertaInformativa('Usuario o contraseña no son correctos');

        }

      }
      )

  }


  verifiReg() {
    this.getCompleted()
    this.registerUser.rol = this.rol.toLowerCase();

    const valido = this.usuarioService.registro(this.registerUser.nombre, this.registerUser.apellido,
      this.registerUser.rol, this.registerUser.email, this.registerUser.contrasena)

      .then(registro => {

        if (registro) {

          const rol = this.registerUser.rol;

          if (rol === 'gerente') {
            // this.router.navigateByUrl('/main-admin/tabsa/tab1a');

            this.mensajeRol()
            console.log('Resgistrado como gerente');
        
          } else if (rol == 'mesero') {
            // this.router.navigateByUrl('/main-mesero/tabs/tab1')
            this.mensajeRol()
            console.log('Resgistrado como mesero');

          } else if (rol === 'cocinero') {
            // this.router.navigateByUrl('main-cocinero/tabsc/tab1c')
            this.mensajeRol()
            console.log('Resgistrado como cocinero');

          } else {
            this.UiService.alertaInformativa('Error en la creación de usuario')
          }

        } else {

          this.UiService.alertaInformativa('Se ha detectado un gerente ya registrado en la base de datos local.',
            'Error al crear el usuario')

        }

      }

      );

  }


  mensajeRol() {
    this.UiService.alertaInformativa('Ahora ya puede ingresar con su email y contraseña',
      'Creado exitosamente')
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }


}
