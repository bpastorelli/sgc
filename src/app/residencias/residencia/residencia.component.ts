import { ErroRegistro } from './../../_models/erro-registro';
import { ResidenciasFilterModel } from './../residencias-filter.model';
import { Cep } from './../../cep/cep.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CepService } from 'src/app/cep/cepService.service';
import { Residencia } from '../residencias.model';
import { ResidenciasService } from '../residencias.service';
import { ResidenciaService } from './residencia.service';
import { AuthenticationService } from './../../_services/authentication.service';
import { ResidenciaResponse } from '../residencia-response.model';

@Component({
  selector: 'app-residencia',
  templateUrl: './residencia.component.html'
})
export class ResidenciaComponent implements OnInit {

  create: boolean = true;
  errorMessage;
  acao: string;
  codigo: string;
  residenciaId: string;

  requestFilterDto: ResidenciasFilterModel;

  erros: ErroRegistro[] = [];

  cepResponse: Cep;

  residencia: Residencia;

  residencias: ResidenciaResponse[];

  logradouroResp: string;
  bairroResp: string;
  localidadeResp: string;
  ufResp: string;
  error = '';

  pag : Number = 1;
  contador : Number = 5;

  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private cepService: CepService,
              private residenciaService: ResidenciaService,
              private residenciasService: ResidenciasService,
              private authenticationService: AuthenticationService

              ) { }

  ngOnInit() {

    this.acao = this.route.snapshot.paramMap.get('acao');
    this.codigo = this.route.snapshot.paramMap.get('codigo');

    if(this.authenticationService.currentUserValue){
      if(this.codigo != "create" && this.codigo != "novo"  && this.acao === null){
          this.create = false;
          this.getResidenciaById(this.codigo);
      }
    }else{
      this.router.navigate(['/login']);
    }

  }

  postNovaResidenciaAmqp(residencia: Residencia){

    this.residenciaService.postNovaResidenciaAmqp(residencia)
      .subscribe(data => {
        this.residencia = data;
        this.router.navigate(['/summary-add']);
      },err=>{
        this.erros = err['erros'];
      });

  }

  putResidencia(residencia: Residencia, id: string){

    this.residenciaService.putResidencia(residencia, id)
      .subscribe(data => {
        this.residencia = data;
        this.router.navigate(['/summary-edit']);
      },err => {
          this.erros = err['erros'];
      });

  }

  getResidenciaById(codigo: string) {

    this.requestFilterDto = new ResidenciasFilterModel();
    this.residencias = [];

    if(codigo)
      this.requestFilterDto.id = codigo;

    this.residenciasService.residencias(this.requestFilterDto)
      .subscribe(
        data=>{
          this.residencias = data;
          this.residencias.forEach(r => {
            if(r.endereco.toString() != null){
                this.logradouroResp = r.endereco.toUpperCase();
                this.bairroResp = r.bairro.toUpperCase();
                this.localidadeResp = r.cidade.toUpperCase();
                this.ufResp = r.uf.toUpperCase();
            }else{
                this.getCep(r.cep)
            }
          });
        }, err=>{
          this.erros = err['erros'];
        }
    );
    return this.residencias;

  }

  getCep(cep: string){

    if(cep != ""){
        this.cepService.getCep(cep)
          .subscribe(
            data=>{
              this.cepResponse = data;
              this.logradouroResp = data.logradouro.toUpperCase();
              this.bairroResp = data.bairro.toUpperCase();
              this.localidadeResp = data.localidade.toUpperCase();
              this.ufResp = data.uf.toUpperCase();
          },err =>{
              this.errorMessage = err.message;
              throw err;
          });

    }

  }

  getIdMorador(codigo: string){

    console.log(`Código enviado: ${codigo}`)
    this.router.navigate([`/morador/`, codigo])

  }

  cancelar(){

    this.router.navigate(['residencias']);

  }

  pageChanged(event){
    this.pag = event;
  }

}
