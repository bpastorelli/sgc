import { properties } from './../../properties/properties';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { Residencias } from './residencias.model';
import { ResidenciasService } from './residencias.service';

@Component({
  selector: 'app-residencias',
  templateUrl: './residencias.component.html'
})
export class ResidenciasComponent implements OnInit {
  public residencias: Residencias[]

  pag : Number = 1 ;
  contador : Number = properties.itemsPerPage;

  constructor(
      private residenciasService: ResidenciasService,
      private authenticationService: AuthenticationService,
      private router: Router,
  ) { }

  ngOnInit() {

    if(this.authenticationService.currentUserValue){
      this.getResidencias("0", null, "0");
    }else{
      this.router.navigate(['/login']);
    }

  }

  getResidencias(codigo: string, endereco: string, numero: string){

    this.residenciasService.residencias(codigo, endereco, numero)
    .subscribe(
      data=>{
        this.residencias = data;
      }, err=>{
        console.log(err);
      }
    );
    return this.residencias;

  }

  getResidenciaById(codigo: string){

    this.residenciasService.residencias(codigo, null, "0")
    .subscribe(
        data=>{
          console.log("Buscando residencia...");
          this.residencias = data;
        }, err=>{
          console.log(err);
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
