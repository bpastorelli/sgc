import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { properties } from 'src/properties/properties';
import { Contribuicao } from '../contribuicao.model';
import { ContribuicoesService } from '../contribuicoes.service';

@Component({
  selector: 'app-minhas-contribuicoes',
  templateUrl: './minhas-contribuicoes.component.html'
})

export class MinhasContribuicoesComponent implements OnInit {

  pag: Number = 1;
  contador: Number = properties.itemsPerPage;

  idUsuario: number;

  contribuicoes: Contribuicao[];

  constructor(
    private router: Router,
    private contribuicoesService: ContribuicoesService,
    private authenticationService: AuthenticationService,
    ) { }

    ngOnInit(): void {

      if(this.authenticationService.currentUserValue){
        this.idUsuario = JSON.parse(localStorage.getItem('idUsuario'));
        console.log(this.idUsuario);
        this.getContribuicoesPorUsuario(this.idUsuario);
      }else{
          this.router.navigate(['/login']);
      }

  }

  getContribuicoes(dataInicial: Date, dataFim: Date){

    this.contribuicoesService.getContribuicoes(dataInicial, dataFim, this.idUsuario)
      .subscribe(
        data=>{
          this.contribuicoes = data;
        }, err=>{
          console.log(err);
        }
      );
  }

  getContribuicoesPorUsuario(moradorId: number){

    this.contribuicoesService.getContribuicoesPorUsuario(moradorId)
      .subscribe(
        data=>{
          this.contribuicoes = data;
        }, err=>{
          console.log(err);
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
