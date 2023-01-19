import { ErroRegistro } from './../../_models/erro-registro';
import { Visitante } from './../visitante.model';
import { Component, OnInit } from '@angular/core';
import { Visita } from './../visitas/visitas.model';
import { Veiculo } from './../../veiculos/veiculo.model';
import { Residencia } from './../../residencias/residencias.model';
import { VisitaRequest } from './../visita/visitaRequest.model';
import { ResidenciasService } from './../../residencias/residencias.service';
import { VeiculosService } from './../../veiculos/veiculos.service';
import { VisitantesService } from './../visitantes.service';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from './../../_services/authentication.service';
import { empty } from 'rxjs';
import { ResidenciasFilterModel } from 'src/app/residencias/residencias-filter.model';
import { ResidenciaResponse } from 'src/app/residencias/residencia-response.model';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html'
})
export class VisitaComponent implements OnInit {

  item: string;
  codigo: string;
  idResp: string;
  placaResp: string;
  nomeResp: string;
  enderecoResp: string;
  numeroResp: string;
  cidadeResp: string;
  ufResp: string;

  marcaResp: string;
  modeloResp: string;
  corResp: string;
  anoResp: string;

  errorMessage;

  createVeiculo: boolean = false;
  mostraVeiculo: boolean = false;


  pag : Number = 1;
  contador : Number = 5;

  public visita: Visita;
  public veiculo: Veiculo;
  public veiculosVinculados: Veiculo[];
  public visitante: Visitante[];
  public residencias: ResidenciaResponse[];
  requestFilterDto: ResidenciasFilterModel;

  erros: ErroRegistro[] = [];

  constructor(private residenciasService: ResidenciasService,
              private veiculoService: VeiculosService,
              private veiculosService: VeiculosService,
              private visitantesService: VisitantesService,
              private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService
              ) { }

  ngOnInit() {

    if(!this.authenticationService.currentUserValue){
      this.router.navigate(['/login']);
    }else{
      this.codigo = this.route.snapshot.paramMap.get('codigo');
    }

  }

  onEnter(rg: string) {
    this.getVisitante(rg);
    this.getVeiculoByVisitanteRg(rg);
  }

  getVisitante(rg: string){

      this.visitantesService.getVisitante(rg, null)
        .subscribe(
          data=>{
            this.idResp = data.id;
            this.nomeResp = data.nome.toUpperCase();
            this.enderecoResp = data.endereco.toUpperCase();
            this.numeroResp = data.numero;
            this.cidadeResp = data.cidade.toUpperCase();
            this.ufResp = data.uf.toUpperCase();
          },err =>{
            this.idResp = null;
            this.nomeResp = null;
            this.enderecoResp = null;
            this.numeroResp = null;
            this.cidadeResp = null;
            this.ufResp = null;
            this.errorMessage = err;
          });
  }

  editVeiculo(codigo: string){

    this.router.navigate(['/veiculo/', codigo]);

  }

  postVisita(visitaRequest: VisitaRequest){

    visitaRequest.residenciaId = this.codigo;

    if(typeof(visitaRequest.placa) === 'undefined')
      visitaRequest.placa = "";

    this.visitantesService.postVisita(visitaRequest)
      .subscribe(data => {
          this.visita = data;
          this.router.navigate(['/summary-visita']);
      },err=>{
          this.errorMessage = err;
      });
  }

  postVisitaAmqp(visitaRequest: VisitaRequest){

    visitaRequest.residenciaId = this.codigo;

    if(typeof(visitaRequest.placa) === 'undefined')
      visitaRequest.placa = "";

    this.visitantesService.postVisitaAmqp(visitaRequest)
      .subscribe(data => {
          this.visita = data;
          this.router.navigate(['/summary-visita']);
      },err=>{
          this.errorMessage = err;
      });
  }

  getResidenciaById(codigo: string){

    this.requestFilterDto = new ResidenciasFilterModel();

    if(codigo)
      this.requestFilterDto.id = codigo;

    this.residenciasService.residencias(this.requestFilterDto)
      .subscribe(
        data=>{
          this.residencias = data;
        }, err=>{
          this.erros = err['erros'];
        }
    );
    return this.residencias;

  }

  getVeiculo(placa: string){

    if(placa.length > 0 || placa == null){
      this.veiculoService.getVeiculoByPlaca(placa)
        .subscribe(
          data=>{
            this.veiculo = data;
            if(this.veiculo == null){
              this.createVeiculo = true;
            }
          }, err=>{
            this.errorMessage = err;
          }
        );
    }
  }

  getVeiculoByVisitanteRg(rg: string){

    if(rg.length > 0){
      this.veiculosService.getVeiculosByVisitanteRg(rg)
      .subscribe(
        data=>{
          this.veiculosVinculados = data;
        },err=>{
          this.errorMessage = err;
        }
      );
    }

  }

  pageChanged(event){
    this.pag = event;
  }

  selecionaVeiculo(data){
    this.createVeiculo = false;
    this.placaResp = data;
  }



}
