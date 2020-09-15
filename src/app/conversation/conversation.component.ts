import { ActivatedRoute } from '@angular/router';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../Interfaces/user';
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthenticationService } from '../services/authentication.service';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})

export class ConversationComponent implements OnInit {

  friendid: any;
  friend: User;
  captura: FormGroup;
  chats: string[] = [];
  user: User;
  conversartion_Id: string;
  textMessage: string='';
  conversation: any[];
  shake: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any;
  imagecropperControl: boolean = false;
  urlIMG:string ='';
  preURL:string='';


  constructor(private activatdRoute: ActivatedRoute,
    private userService: UserService,
    private _fb: FormBuilder, private conversationService: ConversationService, private authenticationService: AuthenticationService, private firebaseStorage: AngularFireStorage) {
    this.friendid = this.activatdRoute.snapshot.params['uid'];
    console.log(this.friendid);


    this.authenticationService.getStatus().subscribe((session) => {
      this.userService.getUserbyID(session.uid).valueChanges().subscribe((user: User) => {
        this.user = user;
        this.userService.getUserbyID(this.friendid).valueChanges().subscribe((data: User) => {
          this.friend = data;
          const ids = [this.user.uid,this.friend.uid].sort();
          this.conversartion_Id = ids.join('|');
          this.getConversation();
        },
          (error) => {
            console.log(error);
          });
      });
    });

  }
  ngOnInit() {
    this.captura = this._fb.group({
      comentarios: ['', [Validators.required, Validators.minLength(1)]],
      depto: [''],
    });


  }


  sendMessage() {
    console.log(this.textMessage);
    const message = {

      uid: this.conversartion_Id,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      recever: this.friend.uid,
      img: this.urlIMG, 
      type: 'text'

    };
    this.conversationService.createConversation(message).then(() => {
      this.textMessage = '';
      this.urlIMG ='';
      this.preURL = '';
    });
  }


  sendZumbido() {
    const message = {

      uid: this.conversartion_Id,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid,
      recever: this.friend.uid,
      type: 'zumbido'

    };
    this.conversationService.createConversation(message).then(() => { });
    this.doZumbido();
  }

  doZumbido() {
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;
    window.setTimeout(() => {
      this.shake = false;
    }, 1000);
  }


  getConversation() {
    console.log(this.conversartion_Id);
    this.conversationService.getConversation(this.conversartion_Id).valueChanges().subscribe((data) => {
      console.log(data, "conversacion");
      this.conversation = data;
      this.conversation.forEach((message) => {
        if (!message.seen) {
          message.seen = true;
          this.conversationService.editConversation(message);
          const audio = new Audio('assets/sound/new_message.m4a');
          audio.play();
        } if (message.type == 'zumbido' && message.seen == false) {
          this.doZumbido();
        }
      });
    },
      (error) => { console.log(error); })
  }


  save(form) {
    console.log(form.comentarios, "Este es mi mensaje de confirmacion");
    this.chats.push(form.comentarios);
    console.log(this.chats, "Aqui estan los comentarios");
  }

  getUserNickById(id) {
    if (id === this.friendid.uid) {
      return this.friendid.nick;
    } else {
      return this.user.nick;
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imagecropperControl = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }



  img() {


    if (this.croppedImage) {
      this.urlIMG = '';
      this.preURL='';
      const currentPictureId = Date.now();
      const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');
      pictures.then((result) => {
        console.log(result);
        this.picture = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
        this.picture.subscribe((p) => {
          console.log(p,"mi url de la imagen")
          this.preURL = p;
          this.urlIMG = this.preURL;
          alert('Imagen Guardada');
        this.sendMessage();
        this.imagecropperControl = false;
        this.picture = "";
        p = '';
        });
      }).catch((error) => {
        this.imagecropperControl = false;
        console.log(error);

      });
    } else {
      this.imagecropperControl = false;
      alert('Error al seleccionar la imagen');
      console.log("Error al seleccionar la imagen");
    }
  }



}
