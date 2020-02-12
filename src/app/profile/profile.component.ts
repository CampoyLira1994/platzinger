import { Component, OnInit } from '@angular/core';
import { User } from '../Interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User;

  constructor(private userService:UserService,private authenticationService:AuthenticationService) { 
    this.authenticationService.getStatus().subscribe((status)=>{
      console.log(status,"Aqui esta el status");
    this.userService.getUserbyID(status.uid).valueChanges().subscribe((data:User)=>{
    this.user = data;
    console.log(this.user,"Aqui esta tu Usuario");
    },(error)=>{console.log(error);
    });
    },(error)=>{
    console.log(error);
    });
  }

  ngOnInit() {
  }

  salveSettings(){
    this.userService.editUser(this.user).then(()=>{
      alert('Cambios Guardados!');
    }).catch((error)=>{
      alert('Hubo un Error');
      console.log(error);
    });
  }

}
