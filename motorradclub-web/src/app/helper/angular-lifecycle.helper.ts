import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class AngularLifecycle implements OnDestroy {
  private destroySubject = new Subject();

  public get destroyed$() {
    return this.destroySubject.asObservable();
  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}