import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewnotesPageRoutingModule } from './newnotes-routing.module';

import { NewnotesPage } from './newnotes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NewnotesPageRoutingModule,
  ],
  declarations: [NewnotesPage],
})
export class NewnotesPageModule {}
