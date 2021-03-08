import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map, take, takeUntil } from 'rxjs/operators';
import { AngularLifecycle } from 'src/app/helper/angular-lifecycle.helper';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService extends AngularLifecycle{

  constructor(
    public afAuth : AngularFireAuth,
    public afStore: AngularFirestore,
    public router: Router
  ) {
    super();
  }

  async signIn(email: string, password: string){
    await this.afAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigate(['admin/dashboard']);
      });
  }

  async signUp(email: string, password: string){
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  signOut(){
    this.afAuth.signOut();
    this.router.navigate(['home']);
  }

  isLoggedIn$() {
    return this.afAuth.authState.pipe(
      takeUntil(this.destroyed$),
      take(1),
      map (user => !!user)
    )
  }
}
