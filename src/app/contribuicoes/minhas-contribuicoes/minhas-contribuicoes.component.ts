import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { properties } from 'src/properties/properties';
import { Contribuicao } from '../contribuicao.model';
import { ContribuicoesService } from '../contribuicoes.service';
import { ErroRegistro } from 'src/app/_models/erro-registro';
import { ContribuicoesFilterModel } from '../contribuicoes-filter.model';

@Component({
  selector: 'app-minhas-contribuicoes',
  templateUrl: './minhas-contribuicoes.component.html'
})

export class MinhasContribuicoesComponent implements OnInit {

  pag: Number = 1;
  contador: Number = properties.itemsPerPage;

  idUsuario: number;

  public loading: boolean;

  id: string; 
  moradorId: number; 
  dataInicio: string; 
  dataFim: string;
  erros: ErroRegistro[] = [];
  request: ContribuicoesFilterModel;

  contribuicoes: Contribuicao[];

  constructor(
    private router: Router,
    private contribuicoesService: ContribuicoesService,
    private authenticationService: AuthenticationService,
    ) { }

    ngOnInit(): void {

      if(this.authenticationService.currentUserValue){
        this.idUsuario = JSON.parse(localStorage.getItem('idUsuario'));
        this.getContribuicoesPorUsuario(this.idUsuario);
      }else{
          this.router.navigate(['/login']);
      }

  }

  getContribuicoes(dataInicio: string, dataFim: string){

    this.erros = [];
    this.loading = false;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;

    this.request = new ContribuicoesFilterModel();

    this.request.moradorId = this.idUsuario.toString();

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

  getContribuicoesPorUsuario(moradorId: number){

    this.erros = [];
    this.loading = false;

    this.request = new ContribuicoesFilterModel();

    this.request.moradorId = this.idUsuario.toString();

    this.contribuicoesService.getContribuicoes(this.request)
      .subscribe(
        data=>{
          this.contribuicoes = data;
        }, err=>{
          this.erros = err['erros'];
        }
      );
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

}
