import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewpassPageRoutingModule } from './viewpass-routing.module';
import { ViewpassPage } from './viewpass.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ViewpassPageRoutingModule],
  declarations: [ViewpassPage],
})
export class ViewpassPageModule {}
