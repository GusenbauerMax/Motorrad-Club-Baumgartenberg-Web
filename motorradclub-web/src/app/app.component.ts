import { Component } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { FirebaseAuthService } from './core/auth/firebase-auth.service';
import { AngularLifecycle } from './helper/angular-lifecycle.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends AngularLifecycle{
  title = 'motorradclub-web';

  showLogout: boolean = false;

  constructor(
    private router: Router,
    private firebaseAuthService: FirebaseAuthService
  ) {
    super();

    router.events.pipe(takeUntil(this.destroyed$)).subscribe((event : Event) => {
      if (event instanceof NavigationEnd){ 
        this.showLogout = event.url === '/admin';
      }
    });
    
  }

  navigateLogin() {
    this.router.navigate(['login']);
  }
  
  public logOut() {
    this.firebaseAuthService.signOut();
  }
}
