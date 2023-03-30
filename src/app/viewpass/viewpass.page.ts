import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-viewpass',
  templateUrl: './viewpass.page.html',
  styleUrls: ['./viewpass.page.scss'],
})
export class ViewpassPage implements OnInit {
  copy = '/assets/icon/copy.svg';
  close = '/assets/icon/close-circle.svg';

  constructor(
    public modalController: ModalController,
    private toastController: ToastController
  ) {}
  data;
  ngOnInit() {}
  cerrarModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Copiado !',
      cssClass: 'my-alert',
      duration: 1000,
      position: 'bottom',
    });
    await toast.present();
  }

  async copyPass(pass) {
    await Clipboard.write({
      string: pass,
    });
    this.presentToast();
  }
}
