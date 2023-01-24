import { MoradoresService } from './../moradores/moradores.service';
import { Contribuicao } from './contribuicao.model';
import { ContribuicoesService } from './contribuicoes.service';
import { Component, OnInit } from '@angular/core';
import { properties } from 'src/properties/properties';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { Moradores } from './../moradores/moradores.model';

@Component({
  selector: 'app-contribuicoes',
  templateUrl: './contribuicoes.component.html'
})
export class ContribuicoesComponent implements OnInit {

  moradores: Moradores[];
  contribuicoes: Contribuicao[];

  pag : Number = 1 ;
  contador : Number = properties.itemsPerPage;

  constructor(
      private router: Router,
      private moradoresService: MoradoresService,
      private contribuicoesService: ContribuicoesService,
      private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {

    if(this.authenticationService.currentUserValue){
       this.getMoradores(1);
       this.getContribuicoes(null, null, 0);
    }else{
       this.router.navigate(['/login']);
    }

  }

  getContribuicoes(dataInicio: Date, dataFim: Date, moradorId: number){

    this.contribuicoesService.getContribuicoes(dataInicio, dataFim, moradorId)
      .subscribe(
        data=>{
          this.contribuicoes = data;
        }, err=>{
          console.log(err);
        }
      );
  }

  getMoradores(posicao: number){

    /*this.moradoresService.getMoradoresByPosicao(posicao)
      .subscribe(
        data=>{
          this.moradores = data;
        }, err=>{
          console.log(err);
        }
      );*/

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
