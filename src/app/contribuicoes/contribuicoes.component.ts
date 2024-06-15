import { MoradoresService } from './../moradores/moradores.service';
import { Contribuicao } from './contribuicao.model';
import { ContribuicoesService } from './contribuicoes.service';
import { Component, OnInit } from '@angular/core';
import { properties } from 'src/properties/properties';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { Moradores } from './../moradores/moradores.model';
import { ErroRegistro } from '../_models/erro-registro';
import { ContribuicoesFilterModel } from './contribuicoes-filter.model';
import { MoradoresFilterModel } from '../moradores/moradores-filter.model';

@Component({
  selector: 'app-contribuicoes',
  templateUrl: './contribuicoes.component.html'
})
export class ContribuicoesComponent implements OnInit {

  public loading: boolean;

  id: string; 
  moradorId: string; 
  dataInicio: string; 
  dataFim: string;
  erros: ErroRegistro[] = [];
  usuarios: Moradores[] = [];
  request: ContribuicoesFilterModel;

  requestFilter: MoradoresFilterModel;

  date = new Date(Date.parse('01/01/9999'));

  moradores: Moradores[];
  contribuicoes: Contribuicao[];

  pag : number = 0 ;
  contador : Number = properties.itemsPerPage;

  constructor(
      private router: Router,
      private usuariosService: MoradoresService,
      private contribuicoesService: ContribuicoesService,
      private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {

    if(this.authenticationService.currentUserValue){
       this.getUsuarios(1);
       this.getContribuicoes(null, null, null);
    }else{
       this.router.navigate(['/login']);
    }

  }

  getContribuicoes(dataInicio: string, dataFim: string, moradorId: string){

    this.erros = [];
    this.loading = false;
    this.moradorId = moradorId;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;

    this.request = new ContribuicoesFilterModel();

    if(moradorId != "0")
      this.request.moradorId = moradorId;

    if(dataInicio)
      this.request.dataInicio = dataInicio;

    if(dataFim)
      this.request.dataFim = dataFim;
    
    this.contribuicoesService.getContribuicoes(this.request)
      .subscribe(
        data=>{
          this.contribuicoes = data;
        }, err=>{
          this.erros = err['erros'];
        }
      );
  }

  getUsuarios(posicao: number){

    this.requestFilter = new MoradoresFilterModel();

    if(posicao)
      this.requestFilter.posicao = posicao;

    this.usuariosService.getMoradores(this.requestFilter)
      .subscribe(
        data=>{
          this.usuarios = data;
        }, err=>{
           this.erros = err['erros'];
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

  formatCPF(cpf: string){

    var p1 = cpf.substring(0,3)
    var p2 = cpf.substring(6,3)
    var p3 = cpf.substring(9,6)
    var p4 = cpf.substring(11,9)

    return p1+"."+p2+"."+p3+"-"+p4

  }

}
