import { Component, OnInit } from '@angular/core';
import { User } from '../Interfaces/user';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends:User[];
  query: string;

  constructor(userService:UserService) {
// this.friends = userService.getfriends();
   }

  ngOnInit() {
  }

}
