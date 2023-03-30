import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { FingerprintPage } from './fingerprint/fingerprint.page';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['auth/login']);
const redirectLoggedInToTabs = () => redirectLoggedInTo(['tabs/tab1']);

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLoggedInToTabs,
    },
  },
  {
    path: 'tabs',
    component: TabsPage,
    loadChildren: () =>
      import(`./tabs/tabs.module`).then((m) => m.TabsPageModule),
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
  {
    path: 'fingerprint',
    component: FingerprintPage,
    loadChildren: () =>
      import('./fingerprint/fingerprint.module').then(
        (m) => m.FingerprintPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
