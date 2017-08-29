import { Injectable } from '@angular/core';
import { AngularFireAuth  } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';




@Injectable()
export class AuthService {

    constructor(private afAuth: AngularFireAuth) { }

    register(email: string, password: string){

        return this.afAuth.auth.createUserWithEmailAndPassword(email,password);

    }

    login(email: string, password: string){

        return this.afAuth.auth.signInWithEmailAndPassword(email, password);

    }


  


    getAuthenticatedUser(){

        return this.afAuth.authState;
    }

    logout(){

        return this.afAuth.auth.signOut();
    }
}