import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserDataSourceService {

  constructor(private store: AngularFirestore) { }

  //Get
  public getUsers$() {
    return this.store.collection('users').valueChanges();
  }
}
