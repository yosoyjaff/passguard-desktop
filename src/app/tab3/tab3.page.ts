import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  logout = '/assets/icon/logout.svg';
  export = '/assets/icon/download.svg';
  finger = '/assets/icon/finger-cricle.svg';
  avatar = '/assets/avatar.svg';
  constructor(private router: Router, private authSvc: AuthService) {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
  }
  toggle: boolean = this.authSvc.isBiometricActive || false;
  userInfo;
  onSignOut() {
    this.authSvc.SignOut();
  }

  setBiometric() {
    const isActive = this.authSvc.isBiometricActive;
    return isActive == false
      ? localStorage.setItem('biometric', 'true')
      : localStorage.setItem('biometric', 'false');
  }
}
