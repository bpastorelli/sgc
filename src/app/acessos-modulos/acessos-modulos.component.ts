import { ErroRegistro } from './../_models/erro-registro';
import { MoradoresFilterModel } from './../moradores/moradores-filter.model';
import { AcessoModuloService } from './acessos-modulos.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { properties } from 'src/properties/properties';
import { Modulo } from '../modulos/modulo.model';
import { Moradores } from '../moradores/moradores.model';
import { MoradoresService } from '../moradores/moradores.service';
import { AcessosModulos } from './acessos-modulos.model';
import { AcessoModulo } from '../_models/acessoModulo';
import { AcessosModulosRequest } from './acessos-modulos-request.model';
import { ModalService } from '../_modal';
import { AcessoFuncionalidadeService } from '../acessos-funcionalidades/acessos-funcionalidades.service';
import { PerfilFuncionalidade } from '../acessos-funcionalidades/acesso-funcionalidade.model';
import { PerfilFuncionalidadeRequest } from '../acessos-funcionalidades/acesso-funcionalidades-request.model';
import { AcessoFuncionalidadeFilter } from '../acessos-funcionalidades/acesso-funcionalidade-filter.model';

@Component({
  selector: 'app-acessos-modulos',
  templateUrl: './acessos-modulos.component.html'
})
export class AcessosModulosComponent implements OnInit {

  pag: Number = 1;
  pagModal: Number = 1;

  contador: Number = properties.itemsPerPage;
  contadorModal: Number = properties.itemPerPageModal;

  erros: ErroRegistro[] = [];

  idModulo: string;
  nomeModulo: string;

  myForm: FormGroup;
  myFormModal: FormGroup;

  modulos: Modulo[] = [];
  usuarios: Moradores[] = [];
  selecionados: AcessosModulos[] = [];
  perfilModulos: AcessosModulos[] = [];
  requestList: AcessosModulosRequest[] = [];
  selecionadosFunc: PerfilFuncionalidade[] = [];
  perfilFuncionalidades: PerfilFuncionalidade[] = [];
  requestListFunc: PerfilFuncionalidadeRequest[] = [];

  requestFilter: MoradoresFilterModel;
  requestAcessosFuncionalidadeFilter: AcessoFuncionalidadeFilter = new AcessoFuncionalidadeFilter();

  constructor(
    private router: Router,
    private modalService: ModalService,
    private usuariosService: MoradoresService,
    private acessosModulo: AcessoModuloService,
    private acessosFuncService: AcessoFuncionalidadeService,
  ) { }

  ngOnInit(): void {

    this.requestList = [];
    this.requestListFunc = [];
    this.selecionados = [];
    this.selecionadosFunc = [];
    this.getUsuarios(1);

  }

  getUsuarios(posicao: number){

    this.requestFilter = new MoradoresFilterModel();

    if(posicao)
      this.requestFilter.posicao = posicao;

    this.usuariosService.getMoradores(this.requestFilter)
      .subscribe(
        data=>{
          this.usuarios = data;
          this.usuarios.forEach((p, index) => {
            if(Number(p.id) == Number(JSON.parse(localStorage.getItem('idUsuario'))))
              this.usuarios.splice(index, 1);
          });
        }, err=>{
           this.erros = err['erros'];
        }
      );

  }

  getAcessosModulo(idUsuario: string){

    this.acessosModulo.getAcessosModulos(idUsuario)
      .subscribe(
        data=>{
          this.perfilModulos = data;
        }, err=>{
           this.erros = err['erros'];
        }
      );

  }

  addAcesso(acesso: AcessoModulo, isChecked: boolean) {

    if(isChecked) {
        acesso.acesso = true;
    } else {
        acesso.acesso = false;
    }

    this.selecionados.push(acesso);

  }

  addAcessoFuncionalidade(acessoFunc: PerfilFuncionalidade, isChecked: boolean, campo: string) {

    switch(campo){
      case 'acesso':{
        if(isChecked) {
          acessoFunc.acesso = true;
          console.log(acessoFunc.acesso);
        } else {
          acessoFunc.acesso = false;
        }
        break;
      }
      case 'inclusao':{
        if(isChecked) {
          acessoFunc.inclusao = true;
          console.log(acessoFunc.inclusao);
        } else {
          acessoFunc.inclusao = false;
        }
        break;
      }
      case 'alteracao':{
        if(isChecked) {
          acessoFunc.alteracao = true;
        } else {
          acessoFunc.alteracao = false;
        }
        break;
      }
      case 'exclusao':{
        if(isChecked) {
          acessoFunc.exclusao = true;
        } else {
          acessoFunc.exclusao = false;
        }
        break;
      }

    }

    this.selecionadosFunc.push(acessoFunc);

  }

  putAcessos(idUsuario: string){

    this.selecionados.forEach(x => {

      let perfil = new AcessosModulosRequest();
      perfil.idModulo = x.idModulo;
      perfil.acesso = x.acesso;
      this.requestList.push(perfil);

    });

    this.acessosModulo.putAcessoModulo(this.requestList, idUsuario)
      .subscribe(data => {
        this.acessosModulo = data
        this.router.navigate([`/summary-edit`]);
      },
      (err) =>{
          this.erros = err['erros'];
    });

    this.requestList = [];
    this.selecionados = [];

  }

  putAcessosFuncionalidade(idUsuario: string){

    this.selecionadosFunc.forEach(x => {
        let perfil = new PerfilFuncionalidadeRequest();
        perfil.idFuncionalidade = x.idFuncionalidade;
        perfil.idModulo = this.idModulo;
        perfil.acesso = x.acesso;
        perfil.inclusao = x.inclusao;
        perfil.alteracao = x.alteracao;
        perfil.exclusao = x.exclusao;
        this.requestListFunc.push(perfil);
    });

    this.acessosFuncService.putAcessoFuncionalidade(this.requestListFunc, idUsuario)
      .subscribe(data => {
        this.perfilFuncionalidades = data
        this.closeModal("custom-modal-1");
    },
    (err) =>{
      this.erros = err['erros'];
    });

    this.requestListFunc = [];
    this.selecionadosFunc = [];

  }

  getAcessosFuncionalidade(idUsuario: string, idModulo: string[]){

    this.requestListFunc = [];
    this.selecionadosFunc = [];

    this.requestAcessosFuncionalidadeFilter = new AcessoFuncionalidadeFilter();

    if(idUsuario)
      this.requestAcessosFuncionalidadeFilter.idUsuario = idUsuario;

    if(idModulo)
      this.requestAcessosFuncionalidadeFilter.idModulo = idModulo;

    this.acessosFuncService.getAcessosFuncionalidade(this.requestAcessosFuncionalidadeFilter)
      .subscribe(
        data=>{
          this.perfilFuncionalidades = data;
          this.modalService.open("custom-modal-1");
        }, err=>{
          this.erros = err['erros'];
        }
      );

  }

  cancelar(){

    this.requestList = [];
    this.selecionados = [];
    this.router.navigate(['/'])

  }

  pageChanged(event){

    this.pag = event;

  }

  pageChangedModal(event){

    this.pagModal = event;

  }

  formatId (n, len) {

    var num = parseInt(n, 10);
    len = parseInt(len, 10);
    return (isNaN(num) || isNaN(len)) ? n : ( 1e10 + "" + num ).slice(-len);

  }

  openModal(idUsuario: string, idModulo: string, nomeModulo: string) {

    this.nomeModulo = nomeModulo;
    this.idModulo = idModulo;

    let modulos: string[] = [];

    modulos.push(idModulo);

    this.getAcessosFuncionalidade(idUsuario, modulos);

  }

  closeModal(id: string) {

    this.requestListFunc = [];
    this.selecionadosFunc = [];
    this.modalService.close(id);

  }

}
