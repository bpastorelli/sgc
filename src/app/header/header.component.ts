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

      this.nome = `${this.currentUser.nome}!`;
      this.montaMenu();

   }

  logout(){

    this.login.logout();

  }

  montaMenu(){

    this.menuMoradores =
      `<li routerLink="active"><a [routerLink]="['/moradores']"/> Moradores</a>
          <ul>
            <li routerLink="active"><a [routerLink]="['morador/novo']"> Incluir</a></li>
            <li routerLink="active"><a [routerLink]="['/moradores']"> Moradores</a>
          </ul>
       </li>
        <li routerLink="active"><a [routerLink]="['/residencias']"> Residência</a>
          <ul>
            <li routerLink="active"><a [routerLink]="['residencia/create']"> Incluir</a></li>
            <li routerLink="active"><a [routerLink]="['/residencias']"> Residências</a>
          </ul>
        </li>
        <li routerLink="active"><a [routerLink]="['/visitantes']"> Visitante</a>
          <ul>
            <li routerLink="active"><a [routerLink]="['visitante/create']"> Incluir</a></li>
            <li routerLink="active"><a [routerLink]="['/visitas']"> Visitas</a></li>
            <li routerLink="active"><a [routerLink]="['/visitantes']"> Visitantes</a>
          </ul>
        </li>`;

  }

}
