import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth) { }
loginWhithEmail(email:string,password:string){
  return this.angularFireAuth.auth.signInWithEmailAndPassword(email,password);
}

registerWithEmail(email:string,password:string){
  return this.angularFireAuth.auth.createUserWithEmailAndPassword(email,password);
}

getStatus(){
  return this.angularFireAuth.authState;
}

logOut(){
  return this.angularFireAuth.auth.signOut();
}
  
}
