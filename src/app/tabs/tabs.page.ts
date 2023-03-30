import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  home = '/assets/icon/home.svg';
  password = '/assets/icon/password-check.svg';
  settings = '/assets/icon/setting-2.svg';
  constructor() {}
}
