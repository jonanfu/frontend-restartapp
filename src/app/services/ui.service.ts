import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private alertCtrl: AlertController,
    private toastCtrl: ToastController) { }

  async alertaInformativa(message: string, header?: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message: string, color?:any) {
    const toast = await this.toastCtrl.create({
      message,
      color,
      position: 'top',
      duration: 1500
    });
    toast.present();
  }

  
}
