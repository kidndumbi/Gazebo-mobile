import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastService {

    constructor(private toastCtrl: ToastController) { }

    createToast(message: string){
           
           return   this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom',
            closeButtonText: 'close'
          });
    }
}