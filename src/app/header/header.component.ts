import { LoginComponent } from './../login/login.component';
import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(
      private login: AppComponent
    ) { }

  ngOnInit(): void {
  }

  logout(){

    this.login.logout();

  }

}
