import { AcessoModulo } from './../_models/acessoModulo';
import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { Observable } from 'rxjs/Observable';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  public theBoundCallback: Function;

  primeiroAcesso: boolean = false;
  currentUser: User;
  isLoggedIn$: Observable<boolean>;
  acessoModulos: AcessoModulo[] = [];

  nome: string;

  constructor(
      private login: AppComponent,
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {

    this.primeiroAcesso = this.currentUser.primeiroAcesso;

    if(!this.currentUser.primeiroAcesso && this.currentUser.primeiroAcesso.toString() != 'undefined'){
      this.montaMenuModulosFuncionalidades(JSON.parse(localStorage.getItem('idUsuario')), true);
      this.nome = this.currentUser.nome.toUpperCase();
    }

  }

  logout(){

    this.login.logout();

  }

  private montaMenuModulosFuncionalidades(idUsuario: string, acesso: boolean){

    //Busca os módulos do usuário
    this.authenticationService.acessosModulos(idUsuario, acesso)
      .subscribe(
        data=>{
          this.acessoModulos = data;
        }, err=>{
          console.log(err);
        }
      );
  }

  index(idModulo: string){

    let item = new Array<AcessoModulo>();
    item = this.acessoModulos.filter(p => p.idModulo === idModulo);

    return this.acessoModulos.indexOf(item[0]);

  }

  close(id: string) {
    $('#' + id).modal('hide');
  }

}
