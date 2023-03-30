import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  StatusBar,
  StatusBarInfo,
  Style,
  BackgroundColorOptions,
} from '@capacitor/status-bar';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  info: StatusBarInfo;
  keys: string[] = [];
  backgroundColor: string = '';

  constructor(private authSvc: AuthService, private router: Router) {
    this.getStatusBarInformation();
    this.showStatus();
    this.setStatusBarStyleDark();
    this.changeBackgroundColor();
    this.biometricCharge();
  }

  getStatusBarInformation() {
    StatusBar.getInfo().then((info: StatusBarInfo) => {
      this.info = info;
      this.keys = Object.keys(this.info);
    });
  }

  showStatus() {
    StatusBar.show().then(() => {
      this.getStatusBarInformation();
    });
  }

  setStatusBarStyleDark = async () => {
    await StatusBar.setStyle({ style: Style.Light });
  };

  changeBackgroundColor() {
    const options: BackgroundColorOptions = { color: '#ffffff' };
    StatusBar.setBackgroundColor(options).then(() => {
      this.getStatusBarInformation();
    });
  }

  biometricCharge() {
    const isActive = this.authSvc.isBiometricActive;
    if (isActive) {
      this.router.navigate(['../../fingerprint']);
      if (isActive) {
        return this.authSvc.performBiometricVerificatin();
      } else {
        return this.router.navigate(['tabs/tab1']);
      }
    }
    return;
  }
}
