import { Component } from '@angular/core';
import { FirebaseAuthService } from './core/auth/firebase-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'motorradclub-web';

  public email: string = "test@gmail.com";
  public password: string = "test123!";

  constructor(private firebaseAuthService: FirebaseAuthService) {
    
  }

  public signIn() {
    console.log(this.email)
    this.firebaseAuthService.signIn(this.email, this.password);
  }

  public logOut() {
    this.firebaseAuthService.signOut();
  }
}
