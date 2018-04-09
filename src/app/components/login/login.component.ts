import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(
    public _chatService: ChatService
  ) { }

  ngOnInit() {
  }

  login(proveedor:string){
    this._chatService.login(proveedor);
  }

}
