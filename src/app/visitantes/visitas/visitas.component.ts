import { properties } from './../../../properties/properties';
import { Router } from '@angular/router';
import { Visita } from './visitas.model';
import { Component, Input, OnInit, Output } from '@angular/core';
import { VisitantesService } from './../visitantes.service';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html'
})
export class VisitasComponent implements OnInit {

  public visita: Visita;
  public visitas: Visita[];
  public situacaoVisita = [
    { id: 2, label: "TODAS" },
    { id: 1, label: "EM ABERTO" },
    { id: 0, label: "ENCERRADAS" }]

  pag : Number = 1 ;
  contador : Number = properties.itemsPerPage;
  posicaoDefault: number = 1;
  errorMessage;

  @Input() ordenar;
  @Input() direction;


  constructor(
              private router: Router,
              private visitantesService: VisitantesService,
              private authenticationService: AuthenticationService
              ) { }

  ngOnInit() {

    if(this.authenticationService.currentUserValue){
        this.ordenar = "dataEntrada";
        this.direction = 'DESC';
        this.getVisitas(null, null, null, this.posicaoDefault, this.ordenar, this.direction);
    }else{
        this.router.navigate(['/login'])
    }

  }

  baixarVisita(id: string, nome: string, rg: string, cpf: string){

    this.visitantesService.baixarVisita(id)
      .subscribe(data => {
        this.visita = data;
        this.getVisitas(nome, rg, cpf, this.posicaoDefault, this.ordenar, this.direction);
    },err=>{
        this.errorMessage = err.message;
        throw err;
    });

  }

  getVisitas(nome: string, rg: string, cpf: string, posicao: number, ord: string, dir: string){

    this.ordenar = ord;
    this.direction = dir;

    this.visitantesService.getVisitas(nome, rg, cpf, posicao, ord, dir)
    .subscribe(
      data=>{
            this.visitas = data;
        }, err=>{
            this.errorMessage = err.message;
            throw err;
        }
      );
  }

  formatId (n, len) {
    var num = parseInt(n, 10);
    len = parseInt(len, 10);
    return (isNaN(num) || isNaN(len)) ? n : ( 1e10 + "" + num ).slice(-len);
  }

  formatCPF(cpf: string){

    if(cpf != ""){

      var p1 = cpf.substring(0,3)
      var p2 = cpf.substring(6,3)
      var p3 = cpf.substring(9,6)
      var p4 = cpf.substring(11,9)

      return p1+"."+p2+"."+p3+"-"+p4

    }

  }

  formatPlaca(placa: string){

    if(!placa)
      return;

    var p1 = placa.substring(0,3);
    var p2 = placa.substring(3,7);

    placa = `${p1}-${p2}`

    return placa;

  }

  pageChanged(event){
    this.pag = event;
  }

}
