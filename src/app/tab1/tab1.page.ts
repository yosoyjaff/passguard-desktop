import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet, Platform } from '@ionic/angular';
import { NotesService } from '../services/notes.service';
import { App } from '@capacitor/app';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  add = '/assets/icon/add.svg';
  edit = '/assets/icon/edit.svg';
  del = '/assets/icon/trash.svg';

  ngOnInit(): void {}
  constructor(
    public platform: Platform,
    public notesService: NotesService,
    private alertController: AlertController,
    private routerOutlet: IonRouterOutlet
  ) {
    this.notesService.getAllNotes();

    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
  }

  doRefresh(event) {
    console.log('Actualizando...');
    setTimeout(() => {
      console.log('Actualizado!');
      this.notesService.getAllNotes();
      event.target.complete();
    }, 500);
  }

  async delNotes(id: string) {
    const alert = await this.alertController.create({
      header: '😦',
      message: 'Estas seguro que deseas eliminar este elemento?',
      cssClass: 'my-alert-confirm-emoji',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
          handler: () => {
            console.log('Confirm NO');
          },
        },
        {
          text: 'SI',
          handler: () => {
            this.notesService.deleteNotes(id);
          },
        },
      ],
    });
    await alert.present();
  }
}
