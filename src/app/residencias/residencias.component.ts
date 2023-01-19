import { properties } from './../../properties/properties';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { Residencia } from './residencias.model';
import { ResidenciasService } from './residencias.service';
import { ErroRegistro } from '../_models/erro-registro';
import { ResidenciasFilterModel } from './residencias-filter.model';
import { ResidenciaResponse } from './residencia-response.model';

@Component({
  selector: 'app-residencias',
  templateUrl: './residencias.component.html'
})
export class ResidenciasComponent implements OnInit {

  residencias: ResidenciaResponse[] = [];

  pag : Number = 1 ;
  contador : Number = properties.itemsPerPage;

  erros: ErroRegistro[] = [];

  requestDto: ResidenciasFilterModel = new ResidenciasFilterModel();

  constructor(
      private residenciasService: ResidenciasService,
      private authenticationService: AuthenticationService,
      private router: Router,
  ) { }

  ngOnInit() {

    if(this.authenticationService.currentUserValue){
      this.getResidencias();
    }else{
      this.router.navigate(['/login']);
    }

  }

  getResidencias(codigo?: string, endereco?: string, numero?: string){

    this.requestDto = new ResidenciasFilterModel();

    if(codigo)
      this.requestDto.id = codigo;

    if(endereco)
      this.requestDto.endereco = endereco;

    if(numero)
      this.requestDto.numero = numero;

    this.residenciasService.residencias(this.requestDto)
    .subscribe(
      data=>{
        this.residencias = data;
      }, err=>{
        this.erros = err['erros'];
      }
    );
    return this.residencias;

  }

  getResidenciaById(codigo: string){

    this.requestDto = new ResidenciasFilterModel();

    if(codigo)
      this.requestDto.id = codigo;

    this.residenciasService.residencias(this.requestDto)
    .subscribe(
        data=>{
          this.residencias = data;
        }, err=>{
          this.erros = err['erros'];
        }
    );
    return this.residencias;

  }

  incluirMorador(codigo: string){

    this.router.navigate([`morador/create/residencia/`, codigo])

  }

  incluirVisita(codigo: string){

    this.router.navigate([`visita/residencia/`, codigo])

  }

  editResidencia(codigo: string){

    this.router.navigate([`/residencia/`, codigo])

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
