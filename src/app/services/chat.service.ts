import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Mensaje } from '../interfaces/Mensaje';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class ChatService {

  public chats:Mensaje[] = [];
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public usuario: any = { };

  constructor(
    private readonly afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {

    this.afAuth.authState.subscribe( user => {
      console.log(user);
      if(!user){
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    } );

  }

  cargarMensajes(){
     this.itemsCollection = this.afs.collection<Mensaje>('chats',
        ref => ref.orderBy('fecha', 'desc').limit(10));

     return this.itemsCollection.valueChanges()
          .map( mensajes => {
            //this.chats = mensajes;
            console.log(this.usuario.uid);
            console.log(mensajes);
            this.chats=[];
            for(let mensaje of mensajes){
              this.chats.unshift(mensaje);
            }
          } );
  }

  nuevoMensaje(texto:string){
    let mensaje:Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };

    return this.itemsCollection.add(mensaje);
  }

  login(proveedor:string){
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    this.usuario = {};
  }

}
