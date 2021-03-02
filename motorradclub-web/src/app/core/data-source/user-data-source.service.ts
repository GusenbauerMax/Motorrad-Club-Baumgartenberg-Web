import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { AngularLifecycle } from 'src/app/helper/angular-lifecycle.helper';
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

  //Get
  public getCurrentUser$() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afStore.doc<any>(`user/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }
}
