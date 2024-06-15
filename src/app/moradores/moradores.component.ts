import { ErroRegistro } from 'src/app/_models/erro-registro';
import { FormBuilder } from '@angular/forms';
import { MoradoresFilterModel } from './moradores-filter.model';
import { properties } from './../../properties/properties';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Moradores } from './moradores.model';
import { MoradoresService } from './moradores.service';
import { AuthenticationService } from './../_services/authentication.service';
import { PermissoesService } from '../_services/permissoes.service';
import { PerfilFuncionalidade } from '../acessos-funcionalidades/acesso-funcionalidade.model';

@Component({
  selector: 'app-moradores',
  templateUrl: './moradores.component.html'
})
export class MoradoresComponent implements OnInit {

  @Input() moradores: Moradores[]

  public id: string;

  pag : Number = 1;
  contador : Number = properties.itemsPerPage;

  formGroup: any;

  request: any = {};

  erros: ErroRegistro[] = [];

  perfil = {} as PerfilFuncionalidade[];

  title = "Cadastro de Moradores";

  requestDto: MoradoresFilterModel = new MoradoresFilterModel();

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private moradoresService: MoradoresService,
      private authenticationService: AuthenticationService,
      private permissao: PermissoesService
    )  { }

  ngOnInit() {

    if(this.authenticationService.currentUserValue){
        this.loadForm();
        this.getMoradores();
        this.router.navigate(['/moradores']);
    }else{
        this.router.navigate(['/login']);
    }

  }

  getMoradores(nome?: string, rg?: string, cpf?: string, email?: string){

    this.requestDto = new MoradoresFilterModel();

    if(nome)
      this.requestDto.nome = nome;

    if(rg)
      this.requestDto.rg = rg;

    if(cpf)
      this.requestDto.cpf = cpf;

    if(email)
      this.requestDto.email = email;

    //let modulos: string[] = [];
    //let funcionalidades: string[] = [];

    //modulos.push('4');
    //funcionalidades.push('9');

    return this.moradoresService.getMoradores(this.requestDto)
      .subscribe(
        data=>{
          this.moradores = data;
          /*this.permissao.getPermissao(modulos,funcionalidades)
          subscribe(
            data=>{
              this.perfil = data;
            }, err=>{
              console.log(err['erros']);
            }
          );*/
        }, err=>{
          this.erros = err['erros'];
        }
      );
  }

  getMoradoresByPosicao(posicao){

    this.requestDto = new MoradoresFilterModel();

    if(posicao)
      this.requestDto.posicao = posicao;

    return this.moradoresService.getMoradores(this.requestDto)
      .subscribe(
        data=>{
          this.moradores = data;
        }, err=>{
          console.log(err);
        }
      );

  }

  preparaCamposRequest(item: MoradoresFilterModel){

    if(item.nome)
      this.requestDto.nome = item.nome;

    if(item.cpf)
      this.requestDto.cpf = item.cpf;

    if(item.rg)
      this.requestDto.rg = item.rg;

    if(item.email)
      this.requestDto.email = item.email;

  }

  getIdMorador(codigo: string){

    this.router.navigate([`/morador/view/`, codigo])

  }

  viewMorador(codigo: string){

    this.router.navigate([`/morador/view/`, codigo])

  }

  pageChanged(event){
    this.pag = event;
  }

  formatId (n, len) {
    var num = parseInt(n, 10);
    len = parseInt(len, 10);
    return (isNaN(num) || isNaN(len)) ? n : ( 1e10 + "" + num ).slice(-len);
  }

  formatCPF(cpf: string){

    var p1 = cpf.substring(0,3)
    var p2 = cpf.substring(6,3)
    var p3 = cpf.substring(9,6)
    var p4 = cpf.substring(11,9)

    return p1+"."+p2+"."+p3+"-"+p4

  }

  formatTelefone(telefone: string){

    if(telefone.length === 10){

      var p1 = telefone.substring(0,2);
      var p2 = telefone.substring(2,6);
      var p3 = telefone.substring(6,11);

      return `(${p1}) ${p2}-${p3}`;
    }else{
      return telefone;
    }

  }

  loadForm(){

    this.formGroup = this.fb.group({
      nome: [''],
      cpf: [''],
      rg: [''],
      email: [''],

    });

  }

  formatCelular(celular: string){

    if(celular.length === 11){

      var p1 = celular.substring(0,2);
      var p2 = celular.substring(2,7);
      var p3 = celular.substring(7,12);

      return `(${p1}) ${p2}-${p3}`;
    }else if(celular.length === 10){

      var p1 = celular.substring(0,2);
      var p2 = celular.substring(2,6);
      var p3 = celular.substring(6,11);

      return `(${p1}) ${p2}-${p3}`;
    }else{
      return celular;
    }

  }

}

