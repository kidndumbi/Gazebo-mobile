import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal } from 'ionic-angular';
import { profile } from '../../models/profile.model';
import { AuthService } from '../../services/firebase/auth.service';
import { FirebaseService } from '../../services/firebase/firebase.service';


/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  selectedGenderValue: string;

  genders = [
    {value: 'male', viewValue: 'male'},
    {value: 'female', viewValue: 'female'},

  ];

    userData:any = {
       email: "", password: ""
    }

    loading = false;

    profileData: profile = { 
           first_name: "",
           last_name: "",
           email: "",
           nick_name: "",
           gender: "male",
           birthday: "",
           avatar: "https://png.icons8.com/mushroom/color/96",
           $key:""
    };


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private firebaseService: FirebaseService,private auth: AuthService, private modal: ModalController
  ) {



  }


  validateForm(ngForm: HTMLFormElement){
 
       if(ngForm.valid){
          this.register();
       }
  }

  openModal() {
    
    const myModal: Modal = this.modal.create('AvatarModalPage');
     myModal.present();

     myModal.onDidDismiss(data=>{
        console.log(data);
        this.profileData.avatar = data.src;
     })
  }

  async register(){

     try{
          const result = await this.auth.register(this.userData.email, this.userData.password);

          console.log(result);

          if(result){
              this.profileData.$key = result.uid;
              this.profileData.email = this.userData.email;
              console.log(this.profileData);

              this.firebaseService.saveProfile(this.profileData).then(result=>{

                        if(result){
                              console.log('success!');
                              this.navCtrl.push('HomePage');
                        }else{
                            console.log('failed!')
                        }

                    });
               }

                }catch(e){
                    console.log(e.message);
                }

      }

  
    login(){

    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
