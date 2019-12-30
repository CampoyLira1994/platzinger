import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private activatdRoute:ActivatedRoute,private userService:UserService) { 
    this.friendid = this.activatdRoute.snapshot.params['uid'];
    console.log(this.friendid);
this.friends = userService.getfriends();

      this.friend = this.friends.find((record) =>{
        return record.uid == this.friendid;
      });
      console.log(this.friend);
 
    }
  ngOnInit() {

  }



}
