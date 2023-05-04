import { ErroRegistro } from './../../_models/erro-registro';
import { Visitante } from './../visitante.model';
import { Component, OnInit } from '@angular/core';
import { Visita } from './../visitas/visitas.model';
import { Veiculo } from './../../veiculos/veiculo.model';
import { VisitaRequest } from './../visita/visitaRequest.model';
import { ResidenciasService } from './../../residencias/residencias.service';
import { VeiculosService } from './../../veiculos/veiculos.service';
import { VisitantesService } from './../visitantes.service';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from './../../_services/authentication.service';
import { ResidenciasFilterModel } from 'src/app/residencias/residencias-filter.model';
import { ResidenciaResponse } from 'src/app/residencias/residencia-response.model';
import { VisitanteFilterModel } from '../visitante/visitante-filter.model';

declare var $: any;

@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html'
})
export class VisitaComponent implements OnInit {

  item: string;
  codigo: string;
  rgV: string;
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

  public createVeiculo: boolean = false;
  mostraVeiculo: boolean = false;


  pag : Number = 1;
  contador : Number = 5;

  public visita: Visita;
  public veiculo: Veiculo;
  public veiculosVinculados: Veiculo[];
  public visitantes: Visitante[];
  public residencias: ResidenciaResponse[];
  requestFilterDto: ResidenciasFilterModel;
  requestFilterVisitante: VisitanteFilterModel;

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
        this.rgV = this.route.snapshot.paramMap.get('rg');
        if(this.rgV)
          this.getVisitante(this.rgV);
        this.close('customModal1');
    }

  }

  onEnter(rg: string) {
    this.getVisitante(rg);
    this.getVeiculoByVisitanteRg(rg);
  }

  getVisitante(rg: string){

    this.nomeResp = null;
    this.enderecoResp = null
    this.numeroResp = null;
    this.cidadeResp = null;
    this.ufResp = null;

    this.requestFilterVisitante = new VisitanteFilterModel();

    if(rg){
      this.requestFilterVisitante.rg = rg;

      this.visitantesService.getVisitantes(this.requestFilterVisitante)
      .subscribe(
        data=>{
            this.visitantes = data;
            if(this.visitantes.length > 0){
              this.visitantes.forEach(visitante => {
                this.idResp = visitante.id;
                this.nomeResp = visitante.nome;
                this.enderecoResp = visitante.endereco;
                this.numeroResp = visitante.numero;
                this.cidadeResp = visitante.cidade;
                this.ufResp = visitante.uf; 
            });
            }else{
              this.open('customModal1');
            } 
        },err =>{
          this.erros = err['erros'];
        });

    }

  }

  editVeiculo(codigo: string){

    this.router.navigate(['/veiculo/', codigo]);
    this.close('customModal1');

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
          this.erros = err['erros'];
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
          this.erros = err['erros'];
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

    this.createVeiculo = false;

    if(placa.length > 0 || placa == null){
      this.veiculoService.getVeiculoByPlaca(placa)
        .subscribe(
          data=>{
            this.veiculo = data;
            if(this.veiculo.placa == null){
              this.createVeiculo = true;
            }
          }, err=>{
              this.erros = err['erros'];
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
          this.erros = err['erros'];
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

  formatPlaca(placa: string){

    placa = placa.replace("-", "");

    var p1 = placa.substring(0,3);
    var p2 = placa.substring(3,7);

    placa = `${p1}-${p2}`

    return placa;

  }

  open(id: string) {

    this.erros = null;
    $('#' + id).modal('show');
  }

  close(id: string) {
    $('#' + id).modal('hide');
  }

  abreCadastroVisitante(rg: string){

    this.router.navigate([`/visitante/create/residencia/${this.codigo}/rg/${rg}`]);

  }


}
