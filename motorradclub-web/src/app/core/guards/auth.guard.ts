import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, mergeMap, take, takeUntil, tap } from 'rxjs/operators';
import { AngularLifecycle } from 'src/app/helper/angular-lifecycle.helper';
import { FirebaseAuthService } from '../auth/firebase-auth.service';
import { UserDataService } from '../data/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends AngularLifecycle implements CanActivate {
  constructor(private auth: FirebaseAuthService, private userDataService: UserDataService, private router: Router) {
    super();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.isLoggedIn$().pipe(
        tap(res => {
          if (!res) this.router.navigate(['home']);
        })
      );
  }
  
}
