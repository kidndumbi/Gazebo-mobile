
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import  'rxjs/add/observable/forkjoin';
import 'rxjs/add/operator/first';
import { profile } from '../../models/profile.model';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { AuthService } from './auth.service';
import { Channel } from '../../models/channel.model';
import { message } from '../../models/message.model';

@Injectable()
export class ChatService {

    user: Observable < firebase.User > ;
    profileData: profile;
    uid:string; 
    

    constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, 
        private firebaseService: FirebaseService, private authService: AuthService) {

              this.firebaseService.getAuthenticatedUserProfile().subscribe(Data=>{  
                    this.uid = Data.$key;
                    this.profileData = Data;

                    //this.addChannel('first channel');
                   
            })


     }


    getAllpublicChats(): FirebaseListObservable < any[] > {

           return this.db.list('/publicChats/');

    }

    submitPublicChat(chatText: string) {

       if(chatText){
        let r = this.db.list('/publicChats/').push({
           chatText: chatText,
           uid: this.uid,
           dateTime: new Date().getTime(),
           first_name: this.profileData.first_name,
           last_name: this.profileData.last_name,
           avatar: this.profileData.avatar

       });
  
        return r.key;

      }

    }

    async addChannel(channelName: string){

        this.db.list('/channel-names/').push({
           name: channelName,

       });
    }

    async submitPrivateChat(message: message){

        await this.db.list('/messages/').push(message);

    }

    //get private chat transcript
    getPrivateChats(userToId: string){

          return this.authService.getAuthenticatedUser()
          .map(auth => auth.uid)
          .mergeMap(uid => this.db.list(`/user-messages/${uid}/${userToId}`))
          .mergeMap(chats => {
            return Observable.forkJoin(
                chats.map(chat => this.db.object(`/messages/${chat.$key}`).first()),
                (...vals:message[]) => {
                    return vals;
                }
                
            )

          });
    }

    //get list of users you are currently chatting with
    getChatHistory(){
        
        return this.authService.getAuthenticatedUser()
        .map(auth => auth.uid)
        .mergeMap(uid => this.db.list(`/user-messages/${uid}/`))
        .map(users => {
           return users.reduce((userIds, x)=>{
                userIds.push(x.$key)
                return userIds
            },[])
        })
        .mergeMap(userIds => {
            return Observable.forkJoin(
                userIds.map(userId => this.db.object(`/profiles/${userId}`).first()),
                (...vals:profile[]) => {
             
                    return vals;
                }
                
            )

          });

    }

    getChannelListRef(): FirebaseListObservable < Channel[]> {

        return this.db.list('/channel-names/');

    }


//     createListItem( itemDescription: string, id:string) : string {

//       if(itemDescription){
//         let r = this.db.list('/myLists/' + id + '/listItems').push({
//         item: itemDescription,

//        });
  
//         return r.key;

//       }

//   }

}