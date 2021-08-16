import { ListaFuncionalidades } from './../_models/listaFuncionalidades';
import { AcessoFuncionalidade } from './../_models/acessoFuncionalidade';
import { AcessoModulo } from './../_models/acessoModulo';
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
  acessoModulos: AcessoModulo[] = [];
  funcionalidades: AcessoFuncionalidade[];
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

    this.buscaFuncionalidades();
    this.montaMenuModulosFuncionalidades(true);
    this.nome = `Olá ${this.currentUser.nome.toLowerCase()}!`;

  }

  logout(){

    this.login.logout();

  }

  montaMenuModulosFuncionalidades(acesso: boolean){

    //Busca os módulos do usuário
    this.authenticationService.acessosModulos(1, true)
      .subscribe(
        data=>{
          data.forEach(m => {
            this.acessoModulos.push(m);
            this.acessoModulos[this.index(m.idModulo)].funcionalidades = this.montaMenuFuncionalidades(m.idModulo);
          });
        }, err=>{
          console.log(err);
        }
      );
  }

  buscaFuncionalidades(){

    //Busca funcionalidades por módulo
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

      var item = localStorage.getItem('funcionalidades');
      this.funcionalidades = JSON.parse(item);

      return this.funcionalidades.filter(p => p.idModulo == idModulo && p.acesso == true);

  }

  index(idModulo: number){

    let item = new Array<AcessoModulo>();
    item = this.acessoModulos.filter(p => p.idModulo == idModulo);

    var index = this.acessoModulos.indexOf(item[0]);
    return index;

  }

}
