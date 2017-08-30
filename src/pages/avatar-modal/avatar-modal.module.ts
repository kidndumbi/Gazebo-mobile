import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvatarModalPage } from './avatar-modal';

@NgModule({
  declarations: [
    AvatarModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AvatarModalPage),
  ],
})
export class AvatarModalPageModule {}
