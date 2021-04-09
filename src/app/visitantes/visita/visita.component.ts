import { Visitante } from './../visitante.model';
import { Component, OnInit } from '@angular/core';
import { Visita } from './../visitas/visitas.model';
import { Residencias } from './../../residencias/residencias.model';
import { VisitaRequest } from './../visita/visitaRequest.model';
import { ResidenciasService } from './../../residencias/residencias.service';
import { VisitantesService } from './../visitantes.service';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from './../../_services/authentication.service';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html'
})
export class VisitaComponent implements OnInit {

  codigo: string;
  nomeResp: string;
  enderecoResp: string;
  numeroResp: string;
  cidadeResp: string;
  ufResp: string;
  errorMessage;

  public visita: Visita;
  public visitantes: Visitante[];
  public residencias: Residencias[];

  constructor(private residenciasService: ResidenciasService,
              private visitantesService: VisitantesService,
              private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService
              ) { }

  ngOnInit() {

    if(this.authenticationService.currentUserValue){
      this.codigo = this.route.snapshot.paramMap.get('codigo');
      this.getResidenciaById(this.codigo);
    }else{
      this.router.navigate(['\login']);
    }

  }

  onEnter(rg: string) {
    this.getVisitante(rg);
  }

  getVisitante(rg: string){

    if(rg.length > 0){
      this.visitantesService.getVisitante(rg, null)
        .subscribe(
          data=>{
            this.nomeResp = data.nome.toUpperCase();
            this.enderecoResp = data.endereco.toUpperCase();
            this.numeroResp = data.numero;
            this.cidadeResp = data.cidade.toUpperCase();
            this.ufResp = data.uf.toUpperCase();
        },err =>{
            this.errorMessage = err;
            throw err;
        });
    }
  }

  postVisita(visitaRequest: VisitaRequest){

    visitaRequest.residenciaId = this.codigo;

    this.visitantesService.postVisita(visitaRequest)
      .subscribe(data => {
          this.visita = data;
          this.router.navigate(['/summary-visita']);
      },err=>{
          this.errorMessage = err;
      });
  }

  getResidenciaById(codigo: string){

    this.residenciasService.residencias(codigo, null, "0")
      .subscribe(
        data=>{
          this.residencias = data;
        }, err=>{
          this.errorMessage = err;
          throw err;
        }
    );
    return this.residencias;

  }

  getVeiculo(placa: string){



  }

}
