import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  operation:string ='login';
  email:string=null;
  password:string=null;
  nick:string=null;

  constructor(private authenticationService:AuthenticationService,private userService:UserService) { }

  ngOnInit() {
  }


  login(){
    this.authenticationService.loginWhithEmail(this.email,this.password).then((data)=>{
      alert('Loggeado correctamente');3.
      console.log(data);
      }).catch((error)=>{
        alert('Ocurrio un Error');
        console.log(error);
      });
  }

  register(){
    this.authenticationService.registerWithEmail(this.email,this.password).then((data)=>{
      const user ={
      uid:data.user.uid,
      email: this.email,
      nick: this.nick
      };
      this.userService.createUser(user).then((data2)=>{
      console.log(data2);
      }).catch((error)=>{
      alert('Ocurrio un error al registrar');
      });
      alert('Registrado correctamente');
      console.log(data);
      }).catch((error)=>{
        alert('Ocurrio un error al registrar');
        console.log(error);
      });
  }


}
