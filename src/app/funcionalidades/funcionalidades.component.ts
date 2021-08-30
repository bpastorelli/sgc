import { Modulo } from '../modulos/modulo.model';
import { Component, OnInit } from '@angular/core';
import { Funcionalidade } from './funcionalidade.model';
import { properties } from 'src/properties/properties';
import { ModulosService } from './../modulos/modulos.service';
import { FuncionalidadeService } from './funcionalidades.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-funcionalidades',
  templateUrl: './funcionalidades.component.html'
})

export class FuncionalidadesComponent implements OnInit {

  public modulos: Modulo[];
  public funcionalidades: Funcionalidade[];

  pag : Number = 1 ;
  contador : Number = properties.itemsPerPage;


  constructor(
      private modulosService: ModulosService,
      private funcionalidadesService: FuncionalidadeService,
      private authenticationService: AuthenticationService,
      private router: Router,
  ) { }

  ngOnInit(): void {

    if(this.authenticationService.currentUserValue){
      this.getModulos(0, null, null, 1);
      this.getFuncionalidades(0, 0, null, -1);
    }else{
      this.router.navigate(['/login']);
    }

  }

  getFuncionalidades(id: number, idModulo: number, descricao: string, posicao: number){

    this.funcionalidadesService.getFuncionalidades(id, idModulo, descricao, posicao)
      .subscribe(
        data=>{
          this.funcionalidades = data;
          console.log(this.funcionalidades);
        }, err=>{
          console.log(err);
        }
      );
  }

  getModulos(id: number, descricao: string, path: string, posicao: number){

    this.modulosService.getModulos(id, descricao, path, posicao)
      .subscribe(
        data=>{
          this.modulos = data;
        }, err=>{
          console.log(err);
        }
      );
  }

  formatId (n, len) {
    var num = parseInt(n, 10);
    len = parseInt(len, 10);
    return (isNaN(num) || isNaN(len)) ? n : ( 1e10 + "" + num ).slice(-len);
  }

  pageChanged(event){

    this.pag = event;

  }

  posicaoDescricao(posicao: number){

    return posicao == 1 ? "ATIVO" : "INATIVO";

  }

  editFuncionalidade(codigo: string){

    this.router.navigate([`/funcionalidade/`, codigo])

  }

}

