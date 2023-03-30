import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PassGuard } from '../interfaces/passguard';

@Injectable({
  providedIn: 'root',
})
export class PassguardService {
  private passguardCollection: AngularFirestoreCollection<PassGuard>;
  passguard: Observable<PassGuard[]>;

  constructor(private readonly afs: AngularFirestore) {}

  getAllPassguard() {
    this.passguardCollection = this.afs.collection<PassGuard>('passguard');
    this.passguard = this.passguardCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as PassGuard;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }
  // Fetch Single Student Object
  getPassguard(id: string) {
    return this.afs.collection<PassGuard>('passguard').doc(id).valueChanges();
  }

  createPassguard(passguard: PassGuard) {
    const date = new Date().toISOString();
    const { createdAt, ...title } = passguard;
    const newpassguard = {
      ...title,
      createdAt: date,
    };
    return this.afs.collection<PassGuard>('passguard').add(newpassguard);
  }

  updatePassguard(id: string, data: PassGuard) {
    return this.afs.collection<PassGuard>('passguard').doc(id).update(data);
  }
  deletePassguard(id: string) {
    return this.afs.collection<PassGuard>('passguard').doc(id).delete();
  }
}
