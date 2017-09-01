import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvatarModalPage } from './avatar-modal';
import { MyPipesModule } from '../../pipes/myPipes.Module';
 

@NgModule({
  declarations: [
    AvatarModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AvatarModalPage),
    MyPipesModule
    
    
  ],
})
export class AvatarModalPageModule {}
