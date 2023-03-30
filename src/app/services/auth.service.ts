import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NativeBiometric } from 'capacitor-native-biometric';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  constructor(
    private toastController: ToastController,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        // biometric value

        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      cssClass: 'my-alert',
      duration: 1000,
      position: 'bottom',
    });
    await toast.present();
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);

        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.presentToast('Completado');
            this.router.navigate(['tabs/tab1']);
          }
        });
      })
      .catch((error) => {
        this.presentToast(error.message);
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  setBiometric() {
    localStorage.setItem('biometric', 'true');
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  get isBiometricActive(): boolean {
    const biometric = JSON.parse(localStorage.getItem('biometric')!);
    return biometric !== null && biometric !== false ? true : false;

    // const biometric = JSON.parse(localStorage.getItem('biometric'));
    // return biometric !== false ? true : false;
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      // biometric ser valor
      localStorage.setItem('biometric', 'false');
      this.presentToast('Sesión cerrada');
      this.router.navigate(['auth/login']);
    });
  }

  async performBiometricVerificatin() {
    const result = await NativeBiometric.isAvailable();
    if (!result.isAvailable) return;
    const verified = await NativeBiometric.verifyIdentity({
      title: 'Iniciar sesión',
      subtitle: 'Utiliza biometría para iniciar sesión',
    })
      .then(() => {
        this.router.navigate(['tabs/tab1']);
        return true;
      })
      .catch(() => {
        this.router.navigate(['../../fingerprint']);
        return false;
      });
  }
}
