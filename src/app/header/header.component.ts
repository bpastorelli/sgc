import { LoginComponent } from './../login/login.component';
import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  isLoggedIn$: Observable<boolean>;
  nome: string;

  constructor(
      private login: AppComponent,
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {

      this.nome = `Olá, ${this.currentUser.nome}!`;

   }

  logout(){

    this.login.logout();

  }

}
