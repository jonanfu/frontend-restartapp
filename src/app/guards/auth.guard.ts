import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { take, map } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UsuarioService, private alertCtrl: AlertController) {

  }

  canActivate(route: ActivatedRouteSnapshot) {
    const rolEsperado = route.data.rol;

    return this.userService.user.pipe(
      take(1),
      map(user => {
        if (user) {

          let rol = user['rol'];
          if (rolEsperado === rol) {
            
            return true;

          } else {
            
            this.mostrarAlerta();
            return this.router.parseUrl('/login');
          
          }

        } else {
          this.mostrarAlerta();
          return this.router.parseUrl('/login');
        }

      })
    )
  }
  async mostrarAlerta() {

    let alert = await this.alertCtrl.create({
      header: 'No autorizado',
      message: 'No tienes autorización para visitar esa página',
      buttons: [
        {
          text: 'Cerrar'

        }],

    });


    alert.present();
  }


}
