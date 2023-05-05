import { VisitanteFilterModel } from './visitante/visitante-filter.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { VisitantesService } from './../visitantes/visitantes.service';
import { Visitante } from './visitante.model';
import { AuthenticationService } from '../_services/authentication.service';
import { ErroRegistro } from '../_models/erro-registro';
import { UtilService } from '../util/util.service';

@Component({
  selector: 'app-visitantes',
  templateUrl: './visitantes.component.html'
})
export class VisitantesComponent implements OnInit {

  public visitantes: Visitante[];

  request: VisitanteFilterModel;

  erros: ErroRegistro[] = [];

  pag : Number = 1 ;
  contador : Number = 20;

  constructor(
              private utilService: UtilService,
              private router: Router,
              private visitantesService: VisitantesService,
              private authenticationService: AuthenticationService
              ) { }

  ngOnInit() {

    if(this.authenticationService.currentUserValue){
      this.getVisitantes(null, null, null, null);
    }else{
      this.router.navigate(['/login']);
    }
  }

  getVisitantes(id?: string, nome?: string, rg?: string, cpf?: string){

    this.request = new VisitanteFilterModel();

    if(id)
      this.request.id = id;

    if(nome)
      this.request.nome = nome;

    if(rg)
      this.request.rg = rg;

    if(cpf)
      this.request.cpf = cpf;

    this.visitantesService.getVisitantes(this.request)
        .subscribe(
           data=>{
              this.visitantes = data;
              this.visitantes.forEach(visitante => {
                visitante.id = this.utilService.formatId(visitante.id, 6)
                visitante.cpf = this.utilService.formatCPF(visitante.cpf)
                visitante.celular = this.utilService.formatCelular(visitante.celular)
                visitante.telefone = this.utilService.formatTelefone(visitante.telefone)
              });
           }, err=>{
              this.erros = err['erros'];
         }
      );
  }

  editVisitante(codigo: string){

    this.router.navigate([`/visitante/`, codigo])

  }

  pageChanged(event){
    this.pag = event;
  }

}
