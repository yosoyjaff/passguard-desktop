import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public formData: FormGroup;
  ngOnInit() {}
  constructor(private authSvc: AuthService) {
    this.formData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onLogin() {
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
    } else {
      const { email, password } = this.formData.value;
      this.authSvc.SignIn(email, password);
    }
  }
}
