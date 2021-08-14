import { AcessoFuncionalidade } from './../_models/acessoFuncionalidade';
import { AcessoModulo } from './../_models/acessoModulo';
import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  currentUser: User;
  isLoggedIn$: Observable<boolean>;
  acessoModulos: AcessoModulo[];
  funcionalidades: AcessoFuncionalidade[];
  funcionalidadesFiltro: AcessoFuncionalidade[];
  acessoFuncionalidades: AcessoFuncionalidade[];
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

    this.montaMenuModulos(true);
    this.buscaFuncionalidades();
    this.montaMenuFuncionalidades(14);
    this.nome = `Olá ${this.currentUser.nome}!`;

  }

  logout(){

    this.login.logout();

  }

  montaMenuModulos(acesso: boolean){

    this.authenticationService.acessosModulos(this.currentUser.id, true)
      .subscribe(
        data=>{
          this.acessoModulos = data;
        }, err=>{
          console.log(err);
        }
      );

  }

  buscaFuncionalidades(){

    this.authenticationService.acessosFuncionalidades(this.currentUser.id, 0, true)
      .subscribe(
        data=>{
          this.acessoFuncionalidades = data;
          localStorage.setItem('funcionalidades', JSON.stringify(this.acessoFuncionalidades));
        }, err=>{
          console.log(err);
        }
      );

  }

  montaMenuFuncionalidades(idModulo: number){

      console.log(idModulo);
      var item = localStorage.getItem('funcionalidades');
      this.funcionalidades = JSON.parse(item);

      console.log(this.funcionalidades);

      this.funcionalidadesFiltro = this.funcionalidades.filter(p => p.idModulo == idModulo);
      console.log(this.funcionalidadesFiltro);

  }

}
