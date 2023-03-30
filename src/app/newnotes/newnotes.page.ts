import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NotesService } from '../services/notes.service';
import { NotificationService } from '../services/notification.service';
@Component({
  selector: 'app-newnotes',
  templateUrl: './newnotes.page.html',
  styleUrls: ['./newnotes.page.scss'],
})
export class NewnotesPage implements OnInit {
  success = '/assets/icon/tick-circle.svg';
  close = '/assets/icon/close-circle.svg';
  editing = false;
  idParams;

  public formNote: FormGroup;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private notesService: NotesService,
    public notify: NotificationService,
    private alertController: AlertController
  ) {
    this.formNote = new FormGroup({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this.idParams = this.activateRoute.snapshot.paramMap.get('noteId');

    this.activateRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.get('noteId')) {
        this.notesService.getNote(paramMap.get('noteId')).subscribe((res) => {
          // fomr set values
          this.editing = true;

          this.formNote.setValue(res);
        });
      }
    });
  }

  async cerrarPage() {
    if (this.formNote.touched) {
      const alert = await this.alertController.create({
        message: 'Deseas guardar?',
        cssClass: 'my-alert-saver',
        buttons: [
          {
            text: 'NO',
            role: 'cancel',
            cssClass: 'alert-button-cancel',
            handler: () => {
              this.router.navigate(['tabs/tab1']);
              this.formNote.reset();
            },
          },
          {
            text: 'SI',
            handler: () => {
              this.editing ? this.updateNote() : this.saveNote();
            },
          },
        ],
      });
      await alert.present();
    } else {
      this.router.navigate(['tabs/tab1']);
    }
  }
  saveNote() {
    if (this.formNote.invalid) {
      this.formNote.markAllAsTouched();
    } else {
      this.notesService.createNotes(this.formNote.value);
      this.router.navigate(['tabs/tab1']);
      this.formNote.reset();
      this.notify.save('Nota guardada');
    }
  }

  updateNote() {
    if (this.formNote.untouched) {
      this.router.navigate(['tabs/tab1']);
      this.notify.unchanged('No efectuaste cambios. saliendo');
    } else {
      this.editing = false;
      this.notesService.updateNotes(this.idParams, this.formNote.value);
      this.router.navigate(['tabs/tab1']);
      this.formNote.markAsUntouched();
      this.notify.save('Nota actualizada');
    }
  }
}
