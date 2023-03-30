import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewnotesPage } from '../newnotes/newnotes.page';
import { NewpassPage } from '../newpass/newpass.page';
import { Tab1Page } from '../tab1/tab1.page';
import { Tab2Page } from '../tab2/tab2.page';
import { Tab3Page } from '../tab3/tab3.page';

const routes: Routes = [
  {
    path: 'tab1',
    component: Tab1Page,
    loadChildren: () =>
      import('../tab1/tab1.module').then((m) => m.Tab1PageModule),
  },
  {
    path: 'tab2',
    component: Tab2Page,
    loadChildren: () =>
      import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
  },
  {
    path: 'tab3',
    component: Tab3Page,
    loadChildren: () =>
      import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
  },

  {
    path: 'new-notes',
    component: NewnotesPage,
    loadChildren: () =>
      import('../newnotes/newnotes.module').then((m) => m.NewnotesPageModule),
  },
  {
    path: 'new-notes/edit/:noteId',
    component: NewnotesPage,
    loadChildren: () =>
      import('../newnotes/newnotes.module').then((m) => m.NewnotesPageModule),
  },

  {
    path: 'new-passguard',
    component: NewpassPage,
    loadChildren: () =>
      import('../newpass/newpass.module').then((m) => m.NewpassPageModule),
  },
  {
    path: 'new-passguard/edit/:passguardId',
    component: NewpassPage,
    loadChildren: () =>
      import('../newpass/newpass.module').then((m) => m.NewpassPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
