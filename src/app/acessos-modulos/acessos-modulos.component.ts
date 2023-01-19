import { AcessoModuloService } from './acessos-modulos.service';
import { Component, OnInit, ElementRef, ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { properties } from 'src/properties/properties';
import { Modulo } from '../modulos/modulo.model';
import { ModulosService } from '../modulos/modulos.service';
import { Moradores } from '../moradores/moradores.model';
import { MoradoresService } from '../moradores/moradores.service';
import { AcessosModulos } from './acessos-modulos.model';
import { AcessoModulo } from '../_models/acessoModulo';
import { AcessosModulosRequest } from './acessos-modulos-request.model';
import { ModalService } from '../_modal';
import { AcessoFuncionalidadeService } from '../acessos-funcionalidades/acessos-funcionalidades.service';
import { PerfilFuncionalidade } from '../acessos-funcionalidades/acesso-funcionalidade.model';
import { PerfilFuncionalidadeRequest } from '../acessos-funcionalidades/acesso-funcionalidades-request.model';

@Component({
  selector: 'app-acessos-modulos',
  templateUrl: './acessos-modulos.component.html'
})
export class AcessosModulosComponent implements OnInit {

  pag: Number = 1;
  pagModal: Number = 1;

  contador: Number = properties.itemsPerPage;
  contadorModal: Number = properties.itemPerPageModal;

  idModulo: number;
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

  constructor(
    private router: Router,
    private modalService: ModalService,
    private modulosService: ModulosService,
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

    /*this.usuariosService.getMoradoresByPosicao(posicao)
      .subscribe(
        data=>{
          this.usuarios = data;
          this.usuarios.forEach((p, index) => {
            if(Number(p.id) == Number(JSON.parse(localStorage.getItem('idUsuario'))))
              this.usuarios.splice(index, 1);
          });
        }, err=>{
          console.log(err);
        }
      );*/

  }

  getAcessosModulo(idUsuario: string){

    this.acessosModulo.getAcessosModulos(idUsuario)
      .subscribe(
        data=>{
          this.perfilModulos = data;
        }, err=>{
          console.log(err);
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

  addAcessoFuncionalidade(acessoFunc: PerfilFuncionalidade, isChecked: boolean) {

    if(isChecked) {
        acessoFunc.acesso = true;
    } else {
        acessoFunc.acesso = false;
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
          console.log(err);;
    });

    this.requestList = [];
    this.selecionados = [];

  }

  putAcessosFuncionalidade(idUsuario: number, idModulo: number){

    this.selecionadosFunc.forEach(x => {
        let perfil = new PerfilFuncionalidadeRequest();
        perfil.idFuncionalidade = x.idFuncionalidade;
        perfil.acesso = x.acesso;
        this.requestListFunc.push(perfil);
    });

    this.acessosFuncService.putAcessoFuncionalidade(this.requestListFunc, idUsuario, idModulo)
      .subscribe(data => {
        this.perfilFuncionalidades = data
        this.requestListFunc = [];
        this.selecionadosFunc = [];
        this.closeModal("custom-modal-1");
    },
    (err) =>{
        console.log(err);;
    });

  }

  getAcessosFuncionalidade(idUsuario: number, idModulo: number){

    this.requestListFunc = [];
    this.selecionadosFunc = [];

    this.acessosFuncService.getAcessosFuncionalidade(idUsuario, idModulo)
      .subscribe(
        data=>{
          this.perfilFuncionalidades = data;
          this.modalService.open("custom-modal-1");
        }, err=>{
          console.log(err);
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

  openModal(idUsuario: number, idModulo: number, nomeModulo: string) {

    this.idModulo = idModulo;
    this.nomeModulo = nomeModulo;
    this.getAcessosFuncionalidade(idUsuario, idModulo);

  }

  closeModal(id: string) {

    this.requestListFunc = [];
    this.selecionadosFunc = [];
    this.modalService.close(id);

  }

}
