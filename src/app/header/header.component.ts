import { AcessoModulo } from './../_models/acessoModulo';
import { LoginComponent } from './../login/login.component';
import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  currentUser: User;
  isLoggedIn$: Observable<boolean>;
  acessoModulos: AcessoModulo[];
  nome: string;
  menuMoradores;
  menuResidencias;

  constructor(
      private login: AppComponent,
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {

    this.authenticationService.acessos(this.currentUser.id, true)
    .subscribe(
      data=>{
        this.acessoModulos = data;
      }, err=>{
        console.log(err);
      }
    );

    this.nome = `Olá ${this.currentUser.nome}!`;

   }

  logout(){

    this.login.logout();

  }

  montaMenu(acesso: boolean){

      return this.authenticationService.acessos(this.currentUser.id, acesso);

  }

}
