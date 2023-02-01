import { FuncionalidadeFilter } from './funcionalidade-filter.model';
import { Modulo } from '../modulos/modulo.model';
import { Component, OnInit } from '@angular/core';
import { Funcionalidade } from './funcionalidade.model';
import { properties } from 'src/properties/properties';
import { ModulosService } from './../modulos/modulos.service';
import { FuncionalidadeService } from './funcionalidades.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { ModulosFilterModel } from '../modulos/modulos-filter.model';

@Component({
  selector: 'app-funcionalidades',
  templateUrl: './funcionalidades.component.html'
})

export class FuncionalidadesComponent implements OnInit {

  public modulos: Modulo[];
  public funcionalidades: Funcionalidade[];

  pag : Number = 1 ;
  contador : Number = properties.itemsPerPage;

  requestFilter: ModulosFilterModel;

  requestFuncionalidadesFilter: FuncionalidadeFilter;

  constructor(
      private modulosService: ModulosService,
      private funcionalidadesService: FuncionalidadeService,
      private authenticationService: AuthenticationService,
      private router: Router,
  ) { }

  ngOnInit(): void {

    if(this.authenticationService.currentUserValue){
      this.getModulos(null, null, null, 1);
      this.getFuncionalidades();
    }else{
      this.router.navigate(['/login']);
    }

  }

  getFuncionalidades(id?: string, idModulo?: string, descricao?: string, posicao?: number){

    this.requestFuncionalidadesFilter = new FuncionalidadeFilter();

    if(id)
      this.requestFuncionalidadesFilter.id = id;

    if(idModulo)
      this.requestFuncionalidadesFilter.idModulo = idModulo;

    if(descricao)
      this.requestFuncionalidadesFilter.descricao = descricao;

    if(posicao)
      this.requestFuncionalidadesFilter.posicao = posicao;

    this.funcionalidadesService.getFuncionalidades(this.requestFuncionalidadesFilter)
      .subscribe(
        data=>{
          this.funcionalidades = data;
          console.log(this.funcionalidades);
        }, err=>{
          console.log(err);
        }
      );
  }

  getModulos(id: string, descricao: string, path: string, posicao: number){

    this.requestFilter = new ModulosFilterModel();

    if(id)
      this.requestFilter.id = id;

    if(descricao)
      this.requestFilter.descricao = descricao;

    if(path)
      this.requestFilter.path = path;

    if(posicao)
      this.requestFilter.posicao = posicao;

    this.modulosService.getModulos(this.requestFilter)
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

