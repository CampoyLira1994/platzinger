import { ActivatedRoute }                               from '@angular/router';
import { Component,Input,Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators }           from '@angular/forms'; 

import { User } from '../Interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})

export class ConversationComponent implements OnInit {

  friends:User[];
  friendid: any;
  friend: User;
  price: number = 78.6553415465454;
  todey:any  = Date.now();
  captura: FormGroup;
  chats:string[] =[];

  constructor(private activatdRoute:ActivatedRoute,
    private userService:UserService,
    private _fb:FormBuilder) 
  { 
    this.friendid = this.activatdRoute.snapshot.params['uid'];
    console.log(this.friendid);
this.friends = userService.getfriends();

      this.friend = this.friends.find((record) =>{
        return record.uid == this.friendid;
      });
      console.log(this.friend);
 
    }
  ngOnInit() {
    this.captura = this._fb.group({     
      comentarios: ['', [Validators.required, Validators.minLength(1)]],
      depto: [''],
   }); 


  }


  save(form) {      
  console.log(form.comentarios,"Este es mi mensaje de confirmacion");
  this.chats.push(form.comentarios);
  console.log(this.chats,"Aqui estan los comentarios");
}



}
