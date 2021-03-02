import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of} from 'rxjs';
import { AngularLifecycle } from 'src/app/helper/angular-lifecycle.helper';
import { FirebaseAuthService } from '../auth/firebase-auth.service';
import { UserDataSourceService } from '../data-source/user-data-source.service';
import { filter, tap, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService extends AngularLifecycle{
  private currentUser = new BehaviorSubject<any>(undefined);

  constructor(private authService: FirebaseAuthService,
              private userDataSourceService: UserDataSourceService) {
    super ();

    authService.isLoggedIn$()
      .pipe(
        takeUntil(this.destroyed$),
        mergeMap(isLoggedIn => {
          if (isLoggedIn) {
            return userDataSourceService.getCurrentUser$();
          } else {
            return of(undefined as any);
          }
        })
      )
      .subscribe(usr => {
        this.currentUser.next(usr);
      });
  }

  // Get

  public getCurrentUser$() {
    return this.currentUser.pipe(
      filter(usr => !!usr),
      tap(usr => console.log('Current user changed', usr))
    );
  }
}
