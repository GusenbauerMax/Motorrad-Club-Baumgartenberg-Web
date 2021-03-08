import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { AngularLifecycle } from 'src/app/helper/angular-lifecycle.helper';
import { User } from 'src/app/models/user.model';
import { FirebaseAuthService } from '../auth/firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataSourceService extends AngularLifecycle{


  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private authService: FirebaseAuthService 
  ) {
    super();
  }

  private collectionName: string = 'users';
  private usersRef = this.afStore.collection(this.collectionName);

  //Get
  public getCurrentUser$() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afStore.doc<any>(`${this.collectionName}/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  public getUsers$() {
    return this.afStore.collection(this.collectionName).valueChanges();
  }

  // Post
  public postUser(user: User) {
    this.usersRef.doc(user.uid).set({...user});
  }
}
