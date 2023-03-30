import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private alertController: AlertController,
    private router: Router
  ) {}

  async unchanged(title: string) {
    const alert = await this.alertController.create({
      header: title,
      cssClass: 'my-alert-notSaaver',
    });
    await alert.present();
    setTimeout(() => {
      alert.dismiss();
    }, 1000);
  }

  async save(title: string) {
    const alert = await this.alertController.create({
      header: title,
      cssClass: 'my-alert-saver',
    });
    await alert.present();
    setTimeout(() => {
      alert.dismiss();
    }, 1000);
  }

  async changed() {
    const alert = await this.alertController.create({
      header: 'Estas seguro que deseas salir?',
      cssClass: 'my-alert-confirm',
      buttons: [
        {
          text: 'NO',
          cssClass: 'alert-button-cancel',
          role: 'cancel',
          handler: () => {
            return false;
          },
        },
        {
          text: 'SI',
          role: 'confirm',
          handler: () => {
            return true;
          },
        },
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role;
  }
}
