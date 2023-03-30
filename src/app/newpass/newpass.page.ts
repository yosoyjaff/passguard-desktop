import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { NotificationService } from '../services/notification.service';
import { PassguardService } from '../services/passguard.service';
@Component({
  selector: 'app-newpass',
  templateUrl: './newpass.page.html',
  styleUrls: ['./newpass.page.scss'],
})
export class NewpassPage implements OnInit {
  success = '/assets/icon/tick-circle.svg';
  close = '/assets/icon/close-circle.svg';
  editing = false;
  formPassguard: FormGroup;
  idParams;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    public notify: NotificationService,
    public passguardService: PassguardService,
    private alertController: AlertController
  ) {
    this.formPassguard = new FormGroup({
      page: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      obs: new FormControl(''),
    });
  }

  ngOnInit() {
    this.idParams = this.activateRoute.snapshot.paramMap.get('passguardId');

    this.activateRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.get('passguardId')) {
        this.passguardService
          .getPassguard(paramMap.get('passguardId'))
          .subscribe((res) => {
            this.editing = true;
            const data = res;
            delete data.id,
              delete data.createdAt,
              // fomr set values
              this.formPassguard.setValue(data);
          });
      }
    });
  }

  async cerrarPage() {
    if (this.formPassguard.touched) {
      const alert = await this.alertController.create({
        message: 'Deseas guardar?',
        cssClass: 'my-alert-saver',
        buttons: [
          {
            text: 'NO',
            role: 'cancel',
            cssClass: 'alert-button-cancel',
            handler: () => {
              this.router.navigate(['tabs/tab2']);
              this.formPassguard.reset();
            },
          },
          {
            text: 'SI',
            handler: () => {
              this.savePassguard();
            },
          },
        ],
      });
      await alert.present();
    } else {
      this.router.navigate(['tabs/tab2']);
    }
  }

  savePassguard() {
    if (this.formPassguard.invalid) {
      this.formPassguard.markAllAsTouched();
    } else {
      this.passguardService.createPassguard(this.formPassguard.value);
      this.router.navigate(['tabs/tab2']);
      this.formPassguard.reset();
      this.notify.save('PassGuard guardada');
    }
  }

  updatePassguard() {
    if (this.formPassguard.untouched) {
      this.router.navigate(['tabs/tab2']);
      this.notify.unchanged('No efectuaste cambios. saliendo');
    } else {
      this.editing = false;
      this.passguardService.updatePassguard(
        this.idParams,
        this.formPassguard.value
      );
      this.router.navigate(['tabs/tab2']);
      this.formPassguard.markAsUntouched();
      this.notify.save('Passguard actualizada');
    }
  }
}
