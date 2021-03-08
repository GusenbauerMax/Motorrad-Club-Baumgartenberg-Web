import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { filter, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { AngularLifecycle } from 'src/app/helper/angular-lifecycle.helper';
import { User } from 'src/app/models/user.model';
import { FirebaseAuthService } from '../auth/firebase-auth.service';
import { UserDataSourceService } from '../data-source/user-data-source.service';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService extends AngularLifecycle{
  private users = new BehaviorSubject<User[]>(undefined);

  constructor(
    private authService: FirebaseAuthService,
    private userDataSourceService: UserDataSourceService
  ) {
    super();

    authService.isLoggedIn$()
      .pipe(
        takeUntil(this.destroyed$),
        mergeMap(isLoggedIn => {
          if (isLoggedIn) {
            return userDataSourceService.getUsers$();
          } else {
            return of(undefined as any);
          }
        })
      )
      .subscribe(usrs => {
        this.users.next(usrs);
      });
  }

  // Get

  public getUsers$() {
    return this.users.pipe(
      filter (users => !!users),
      tap(users => console.log('Users changed', users))
    )
  }
}
