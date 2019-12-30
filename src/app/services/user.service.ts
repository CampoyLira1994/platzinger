import { Injectable } from '@angular/core';
import { User } from '../Interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  friends:User[];
  constructor() {

    let Usuario1: User = {

      nick:'Campoy',
      subnick:'Smor',
      age:25,
      email:'smorcamlir@gmail.com',
      friend: true,
      uid: 1,
      status: 'online'

    }
    let Usuario2: User = {

      nick:'Campoy',
      subnick:'Smor',
      age:25,
      email:'camlir@gmail.com',
      friend: false,
      uid: 2,
      status: 'offline'

    }
    let Usuario3: User = {

      nick:'Lira',
      subnick:'Lir',
      age:25,
      email:'lir@gmail.com',
      friend: true,
      uid: 3,
      status: 'busy'

    }
    let Usuario4: User = {

      nick:'Juan',
      subnick:'Juan',
      age:25,
      email:'camlir@gmail.com',
      friend: true,
      uid: 4,
      status: 'away'

    }
    let Usuario5: User = {

      nick:'Antonio',
      subnick:'Ant',
      age:25,
      email:'Ant@gmail.com',
      friend: true,
      uid: 5,
      status: 'online'

    }

this.friends = [Usuario1,Usuario2,Usuario3,Usuario4,Usuario5]
   }

   getfriends(){
     return this.friends
   }
   
}

