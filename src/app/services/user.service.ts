import { Injectable } from '@angular/core';
import { User } from '../Interfaces/user';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  friends:User[];
  constructor(private angularFireDatabase:AngularFireDatabase) {
  }

   getUsers(){
    return this.angularFireDatabase.list('/users');
  }

  getUserbyID(uid){
    return this.angularFireDatabase.object('/users/' + uid);
  }
  // getfriends(){
  // return this.friends
  // }
  createUser(user){
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

  editUser(user){
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }
   
}

