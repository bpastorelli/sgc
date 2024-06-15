import { Component, OnInit } from '@angular/core';

import { User } from './../_models/user';
import { UserService } from './../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  loading = false;
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
      this.loading = false;
      //this.userService.getAll().pipe(first()).subscribe(users => {
       //   this.loading = false;
        //  this.users = users;
      //});
  }
}
