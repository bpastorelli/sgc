import { ErroRegistro } from './../_models/erro-registro';
import { AcessoFuncionalidadeFilter } from './acesso-funcionalidade-filter.model';
import { properties } from 'src/properties/properties';
import { AcessoFuncionalidadeService } from './acessos-funcionalidades.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { PerfilFuncionalidade } from './acesso-funcionalidade.model';
import { Modulo } from '../modulos/modulo.model';
import { MoradoresService } from '../moradores/moradores.service';
import { ModulosService } from './../modulos/modulos.service';
import { Moradores } from '../moradores/moradores.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PerfilFuncionalidadeRequest } from './acesso-funcionalidades-request.model';
import { ModulosFilterModel } from '../modulos/modulos-filter.model';

@Component({
  selector: 'app-acessos-funcionalidades',
  templateUrl: './acessos-funcionalidades.component.html'
})

export class AcessosFuncionalidadesComponent implements OnInit {

  myForm: FormGroup;
  modulos: Modulo[];
  usuarios: Moradores[];
  requestList: PerfilFuncionalidadeRequest[] = [];
  selecionados: PerfilFuncionalidade[] = [];
  perfilFuncionalidadeRequest: PerfilFuncionalidadeRequest;
  perfilFuncionalidades: PerfilFuncionalidade[] = [];

  requestFilter: AcessoFuncionalidadeFilter;

  erros: ErroRegistro[] = [];

  pag : Number = 1 ;
  contador : Number = properties.itemsPerPage;

  requestModulosFilter: ModulosFilterModel;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuariosService: MoradoresService,
    private modulosService: ModulosService,
    private acessosFuncService: AcessoFuncionalidadeService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {

    this.getUsuarios(1); //Recupera usuários com posição = 1 (ATIVO)
    this.getModulos(null, null, null, 1); //Recupera todos os módulos com posicao 1 (ATIVO)

    this.myForm = this.fb.group({
      acessos: this.fb.array([])
    });

  }

  getAcessosFuncionalidade(idUsuario: string, idModulo: string){

    this.requestList = [];
    this.selecionados = [];

    let modulos: string[];

    modulos.push(idModulo);

    this.requestFilter = new AcessoFuncionalidadeFilter();

    if(idUsuario)
      this.requestFilter.idUsuario = idUsuario;

    if(idModulo)
      this.requestFilter.idModulo = modulos;

    this.acessosFuncService.getAcessosFuncionalidade(this.requestFilter)
      .subscribe(
        data=>{
          this.perfilFuncionalidades = data;
        }, err=>{
          this.erros = err['erros'];
        }
      );

  }

  getModulos(id?: string, descricao?: string, path?: string, posicao?: number){

    this.requestModulosFilter = new ModulosFilterModel();

    if(id)
      this.requestModulosFilter.id = id;

    if(descricao)
      this.requestModulosFilter.descricao = descricao;

    if(path)
      this.requestModulosFilter.path = path;

    if(posicao)
      this.requestModulosFilter.posicao = posicao;

    this.modulosService.getModulos(this.requestModulosFilter)
      .subscribe(
        data=>{
          this.modulos = data;
        }, err=>{
          this.erros = err['erros'];
        }
      );
  }

  getUsuarios(posicao: number){

    /*this.usuariosService.getMoradoresByPosicao(posicao)
      .subscribe(
        data=>{
          this.usuarios = data;
        }, err=>{
          console.log(err);
        }
      );*/

  }

  putAcessos(idUsuario: string, idModulo: string){

    this.selecionados.forEach(x => {
        let perfil = new PerfilFuncionalidadeRequest();
        perfil.idModulo = idModulo;
        perfil.idFuncionalidade = x.idFuncionalidade;
        perfil.acesso = x.acesso;
        this.requestList.push(perfil);
    });

    this.acessosFuncService.putAcessoFuncionalidade(this.requestList, idUsuario)
      .subscribe(data => {
        this.perfilFuncionalidadeRequest = data
        this.router.navigate([`/summary-edit`]);
    },
    (err) =>{
        console.log(err);;
    });

    this.requestList = [];
    this.selecionados = [];

  }

  addAcesso(acesso: PerfilFuncionalidade, isChecked: boolean) {

    if(isChecked) {
        acesso.acesso = true;
    } else {
        acesso.acesso = false;
    }

    this.selecionados.push(acesso);

  }

  cancelar(){

    this.router.navigate(['/'])

  }

  pageChanged(event){
    this.pag = event;
  }

  formatId (n, len) {
    var num = parseInt(n, 10);
    len = parseInt(len, 10);
    return (isNaN(num) || isNaN(len)) ? n : ( 1e10 + "" + num ).slice(-len);
  }

}

