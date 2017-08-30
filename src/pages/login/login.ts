import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/firebase/auth.service';
import { ToastService } from '../../services/toast.service';
import { login } from '../../models/login.model';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginData: login = {
    email: "",
    password: ""
  }


  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService,
    private toast: ToastService) {
  }

  async login(email:string, password: string){

     console.log(email);
     console.log(password);

     try{
          const result = await this.auth.login(email, password)
          console.log(result);
          this.toast.createToast('Login successfull').present()
          this.navigateToHome();

     }catch(e){
        this.toast.createToast(e.message).present()
     }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  navigateToHome(){
      this.navCtrl.setRoot('HomePage',{
      item: "Slice!"
    });
  }

  navigatetoRegsiter(){
       this.navCtrl.push('RegisterPage',{
      item: "Slice!"
    });
  }

}
