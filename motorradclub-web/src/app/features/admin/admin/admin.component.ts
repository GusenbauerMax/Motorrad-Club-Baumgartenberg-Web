import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { FirebaseAuthService } from 'src/app/core/auth/firebase-auth.service';
import { UserDataService } from 'src/app/core/data/user-data.service';
import { UsersDataService } from 'src/app/core/data/users-data.service';
import { AngularLifecycle } from 'src/app/helper/angular-lifecycle.helper';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends AngularLifecycle implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName','email', 'edit', 'delete'];
  users: User[];
  dataSource;

  // Add User
  newEmail: string;
  newFirstName: string;
  newLastName: string;

  constructor(
    private authService: FirebaseAuthService,
    private userDataService: UserDataService,
    private usersDataService: UsersDataService
  ) {
    super();

    this.dataSource = new MatTableDataSource<any>(this.users);

    usersDataService.getUsers$().pipe(takeUntil(this.destroyed$)).subscribe(
      res =>  {
          this.users = res;
          this.refreshTable();
          console.log(this.users);
      }
  );

  }

  ngOnInit(): void {
  }

  addUser() {
    this.authService.signUp(this.newEmail, "standard123?!")
      .then((userCredential) => {
        let newUser: User = {
          uid: userCredential.user.uid,
          firstName: this.newFirstName,
          lastName: this.newLastName,
          email: this.newEmail
        }
        this.userDataService.postUser(newUser);
        this.users.push(newUser);
        this.refreshTable();
      });
  }

  removeUser(user) {
    this.users = this.users.filter(data => data.uid != user.uid);
    console.log(user)
    this.refreshTable();
  }

  refreshTable() {
    this.dataSource = new MatTableDataSource<any>(this.users);
  }

}
