import { ViewpassPage } from './../viewpass/viewpass.page';
import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { PassguardService } from '../services/passguard.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  // icons svg
  add = '/assets/icon/add.svg';
  edit = '/assets/icon/edit.svg';
  del = '/assets/icon/trash.svg';
  arrow = '/assets/icon/arrow-right.svg';

  formEdit: FormGroup;

  ngOnInit(): void {}
  constructor(
    public modalController: ModalController,
    public passguardService: PassguardService,
    private alertController: AlertController
  ) {
    this.passguardService.getAllPassguard();
  }
  doRefresh(event) {
    console.log('Actualizando...');
    setTimeout(() => {
      console.log('Actualizado!');
      this.passguardService.getAllPassguard();
      event.target.complete();
    }, 500);
  }

  async delPassguard(id: string) {
    const alert = await this.alertController.create({
      header: '😦',
      message: 'Estas seguro que deseas eliminar este elemento?',
      cssClass: 'my-alert-confirm-emoji',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
          handler: () => {},
        },
        {
          text: 'SI',
          handler: () => {
            this.passguardService.deletePassguard(id);
          },
        },
      ],
    });
    await alert.present();
  }

  async ViewpassPages(data) {
    const modal = await this.modalController.create({
      component: ViewpassPage,
      componentProps: {
        data: data,
      },
    });
    return await modal.present();
  }
}
