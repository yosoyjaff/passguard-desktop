import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { map, subscribeOn } from 'rxjs/operators';
import { Notes } from '../interfaces/notes';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private notesCollection: AngularFirestoreCollection<Notes>;
  notes: Observable<Notes[]>;
  constructor(private readonly afs: AngularFirestore) {}

  getAllNotes() {
    this.notesCollection = this.afs.collection<Notes>('notes');
    this.notes = this.notesCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Notes;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }
  // Fetch Single Student Object
  getNote(id: string) {
    return this.afs.collection<Notes>('notes').doc(id).valueChanges();
  }

  createNotes(notes: Notes) {
    const date = new Date().toISOString();
    const { createdAt, ...title } = notes;
    const newNote = {
      ...title,
      createdAt: date,
    };
    return this.afs.collection<Notes>('notes').add(notes);
  }

  updateNotes(id: string, data: Notes) {
    return this.afs.collection<Notes>('notes').doc(id).update(data);
  }
  deleteNotes(id: string) {
    return this.afs.collection<Notes>('notes').doc(id).delete();
  }
}
