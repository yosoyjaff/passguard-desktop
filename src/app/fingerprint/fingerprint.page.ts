import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-fingerprint',
  templateUrl: './fingerprint.page.html',
  styleUrls: ['./fingerprint.page.scss'],
})
export class FingerprintPage implements OnInit {
  finger = '/assets/icon/finger-cricle.svg';
  constructor(private authSvc: AuthService) {}

  ngOnInit() {}

  fingerIn() {
    this.authSvc.performBiometricVerificatin();
  }
}
