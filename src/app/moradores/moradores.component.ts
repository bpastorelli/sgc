import { ErroRegistro } from 'src/app/_models/erro-registro';
import { FormBuilder } from '@angular/forms';
import { MoradoresFilterModel } from './moradores-filter.model';
import { properties } from './../../properties/properties';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Moradores } from './moradores.model';
import { MoradoresService } from './moradores.service';
import { AuthenticationService } from './../_services/authentication.service';
import { PermissoesService } from '../_services/permissoes.service';
import { PerfilFuncionalidade } from '../acessos-funcionalidades/acesso-funcionalidade.model';
import { MoradoresResponse } from './moradores-response.model';

@Component({
  selector: 'app-moradores',
  templateUrl: './moradores.component.html'
})
export class MoradoresComponent implements OnInit {

  
  public moradores: MoradoresResponse;
  public id: string;
  public nome: string; 
  public rg: string; 
  public cpf: string;
  public email: string;
  public pag : number = 1;
  public contador : Number = properties.itemsPerPage;
  public totalItems: number;

  formGroup: any;

  request: any = {};

  erros: ErroRegistro[] = [];

  perfil = {} as PerfilFuncionalidade[];

  title = "Cadastro de Moradores";

  requestDto: MoradoresFilterModel = new MoradoresFilterModel();

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private moradoresService: MoradoresService,
      private authenticationService: AuthenticationService,
      private permissao: PermissoesService
    )  { }

  ngOnInit() {

    this.pag = parseInt(this.route.snapshot.paramMap.get('page'));

    if(this.pag === null || isNaN(this.pag))
      this.pag = 1;

    if(this.authenticationService.currentUserValue){
        this.loadForm();
        this.getMoradores(this.nome, null, null, null, this.pag);
        this.router.navigate(['/moradores/' + this.pag]);
    }else{
        this.router.navigate(['/login']);
    }

  }

  getMoradores(nome?: string, rg?: string, cpf?: string, email?: string, page?: number){

    this.requestDto = new MoradoresFilterModel();

    if(nome)
      this.requestDto.nome = nome;

    if(rg)
      this.requestDto.rg = rg;

    if(cpf)
      this.requestDto.cpf = cpf;

    if(email)
      this.requestDto.email = email;

    if(page)
      this.requestDto.page = page;

    return this.moradoresService.getMoradores(this.requestDto)
      .subscribe(
        data=>{
          this.moradores = data;
          this.totalItems = this.moradores.paginacao.totalItems;
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

    if(item.page != null )
      this.request.page = item.page;

  }

  getIdMorador(codigo: string, page: number){

    this.router.navigate([`/morador/view/`+ codigo +`/` + page])

  }

  viewMorador(codigo: string, page: number){

    this.router.navigate([`/morador/view/`+ codigo +`/` + page])

  }

  pageChanged(event){
    this.pag = event;

    this.getMoradores(this.nome, this.rg, this.cpf, this.email, this.pag);
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

