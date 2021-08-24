import { SummaryAddComponent } from './../summary/add/summary-add.component';

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
import { AcessoFuncionalidade } from '../_models/acessoFuncionalidade';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { PerfilFuncionalidadeRequest } from './acesso-funcionalidades-request.model';
import { request } from 'node:http';
import { Console } from 'node:console';

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

  pag : Number = 1 ;
  contador : Number = properties.itemsPerPage;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuariosService: MoradoresService,
    private modulosService: ModulosService,
    private acessosFuncService: AcessoFuncionalidadeService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {

    this.getUsuarios(1);
    this.getModulos(0, null, null, 1);

    this.myForm = this.fb.group({
      acessos: this.fb.array([])
    });

  }

  getAcessosFuncionalidade(idUsuario: number, idModulo: number){

    this.acessosFuncService.getAcessosFuncionalidade(idUsuario, idModulo)
      .subscribe(
        data=>{
          this.perfilFuncionalidades = data;
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

  getUsuarios(posicao: number){

    this.usuariosService.getMoradoresByPosicao(posicao)
      .subscribe(
        data=>{
          this.usuarios = data;
        }, err=>{
          console.log(err);
        }
      );

  }

  putAcessos(idUsuario: number, idModulo: number){

    this.selecionados.forEach(x => {

        let perfil = new PerfilFuncionalidadeRequest();
        perfil.idFuncionalidade = x.idFuncionalidade;
        perfil.acesso = x.acesso;
        this.requestList.push(perfil);

    });

    this.acessosFuncService.putAcessoFuncionalidade(this.requestList, idUsuario, idModulo)
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

