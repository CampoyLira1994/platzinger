import { Component, OnInit } from '@angular/core';
import { User } from '../Interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends:User[];
  query: string;
  user:User;

  constructor(userService:UserService,private authenticationService:AuthenticationService,private roter:Router) {
    
    this.authenticationService.getStatus().subscribe((status)=>{
      userService.getUserbyID(status.uid).valueChanges().subscribe((data:User)=>{
      this.user = data;
      console.log(this.user ,"Este soy yo Usuario Logeado");
      },(error)=>{
        console.log(error);
      });
    },(error)=>{
    console.log(error);
    });

 userService.getUsers().valueChanges().subscribe((data:User[])=>{
   this.friends = data;
 },(error)=>{
   console.log(error);
 });
   }

  ngOnInit() {
  }

  logout(){
    this.authenticationService.logOut().then(() => {
      alert("Secion Cerrada");
      this.roter.navigate(['login']);
    },(error)=>{
      console.error(error);
    });
  }

}
