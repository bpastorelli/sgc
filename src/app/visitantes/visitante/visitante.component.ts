import { VisitanteFilterModel } from './visitante-filter.model';
import { Cep } from './../../cep/cep.model';
import { Visitante } from '../visitante.model';
import { Component, OnInit } from '@angular/core';
import { CepService } from './../../cep/cepService.service';
import { Router, ActivatedRoute } from '@angular/router';
import { VeiculosService } from './../../veiculos/veiculos.service';
import { VisitantesService } from './../visitantes.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Veiculo } from 'src/app/veiculos/veiculo.model';

@Component({
  selector: 'app-visitante',
  templateUrl: './visitante.component.html'
})

export class VisitanteComponent implements OnInit {

  id: string
  acao: string;
  codigo: string;
  create: boolean = true;
  pag: number = 1;
  contador: number = 5;
  errorMessage;

  logradouroResp: string;
  bairroResp: string;
  localidadeResp: string;
  ufResp: string;

  public cepResponse: Cep;
  public visit: Visitante;
  public visitantes: Visitante[];
  public veiculosVinculados: Veiculo[];
  public situacaoCadastral = [
        { id: 1, label: "ATIVO" },
        { id: 0, label: "INATIVO" }]

  request: VisitanteFilterModel;

  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private cepService: CepService,
              private visitantesService: VisitantesService,
              private veiculosService: VeiculosService,
              private authenticationService: AuthenticationService
              ) { }
  ngOnInit() {

    if(this.authenticationService.currentUserValue){

      this.codigo = this.route.snapshot.paramMap.get('codigo');
      if(this.codigo != "create" && this.codigo != "novo"){
          this.create = false;
          this.getVisitanteById(this.codigo);
          this.getVeiculoByVisitanteId(this.codigo);
      }
    }else{
      this.router.navigate(['/login']);
    }

  }

  postVisitante(visitante: Visitante){

    if(visitante.cpf != null)
      visitante.cpf = visitante.cpf.replace('.','').replace('-','');

    this.visitantesService.postVisitante(visitante)
      .subscribe(data => {
        this.visit = data;
        this.id = data.id;
        this.router.navigate(['/veiculo/novo/visitante/', this.id]);
    },err=>{
        this.errorMessage = err;
    });

  }

  postVisitanteAmqp(visitante: Visitante){

    if(visitante.cpf != null)
      visitante.cpf = visitante.cpf.replace('.','').replace('-','');

    this.visitantesService.postVisitanteAmqp(visitante)
      .subscribe(data => {
        this.visit = data;
        this.id = data.ticket;
        this.router.navigate(['/veiculo/amqp/visitante/', this.id]);
    },err=>{
        this.errorMessage = err;
    });

  }

  putVisitante(visitante: Visitante, id: string){

    if(visitante.cpf != null)
      visitante.cpf = visitante.cpf.replace('.','').replace('-','');

    this.visitantesService.putVisitante(visitante, id)
      .subscribe(data => {
        this.visit = data;
        this.router.navigate(['/summary-edit']);
    },err=>{
        this.errorMessage = err;
    });

  }

  getVisitanteById(id: string){

    this.request = new VisitanteFilterModel();

    if(id)
      this.request.id = id;

    this.visitantesService.getVisitantes(this.request)
      .subscribe(
        data=>{
            this.visitantes = data;
            this.visitantes.forEach(v => {
                this.getCep(v.cep)
            });
        }, err=>{
           this.errorMessage = err;
      }
    );
    return this.visitantes;

  }

  getVeiculoByVisitanteId(id: string){

    this.veiculosService.getVeiculosByVisitanteId(id)
      .subscribe(
        data=>{
          this.veiculosVinculados =  data;
        },err=>{
          this.errorMessage = err;
        }

      );

  }

  editVeiculo(codigo: string){

    this.router.navigate(['/veiculo/', codigo]);

  }

  getCep(cep: string){

    if(cep != null){
      this.cepService.getCep(cep)
        .subscribe(
          data=>{
            this.cepResponse = data;
            this.logradouroResp = data.logradouro.toUpperCase();
            this.bairroResp = data.bairro.toUpperCase();
            this.localidadeResp = data.localidade.toUpperCase();
            this.ufResp = data.uf.toUpperCase();
        },err =>{
            this.errorMessage = err;
        });
    }
  }

  pageChanged(event){
    this.pag = event;
  }

  cancelar(){

    this.router.navigate(['visitantes'])

  }

}
