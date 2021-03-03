import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/core/auth/firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string = "";
  public password: string = "";

  constructor(private firebaseAuthService: FirebaseAuthService) { }

  ngOnInit(): void {
  }

  public signIn() {
    this.firebaseAuthService.signIn(this.email, this.password);
  }

}
