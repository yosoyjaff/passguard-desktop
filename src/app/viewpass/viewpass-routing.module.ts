import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewpassPage } from './viewpass.page';

const routes: Routes = [
  {
    path: '',
    component: ViewpassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewpassPageRoutingModule {}
