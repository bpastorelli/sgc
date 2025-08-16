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
import { PermissoesService } from 'src/app/_services/permissoes.service';
import { PerfilFuncionalidade } from 'src/app/acessos-funcionalidades/acesso-funcionalidade.model';
import { ResidenciasPaginadoResponse } from '../residencias-paginado-response.model';

declare var $: any;

@Component({
  selector: 'app-residencia',
  templateUrl: './residencia.component.html'
})
export class ResidenciaComponent implements OnInit {

  create: boolean = true;
  errorMessage;
  acao: string;
  codigo: string;
  ticket: string;
  residenciaId: string;

  requestFilterDto: ResidenciasFilterModel;

  perfil: PerfilFuncionalidade[] = [];

  erros: ErroRegistro[] = [];

  cepResponse: Cep;

  residencia: Residencia;

  residencias: ResidenciasPaginadoResponse;

  logradouroResp: string;
  bairroResp: string;
  localidadeResp: string;
  ufResp: string;
  error = '';

  title = 'Cadastro de Residências';
  msgModal: string = '';

  public pag : number = 1;
  contador : Number = 5;

  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private cepService: CepService,
              private residenciaService: ResidenciaService,
              private residenciasService: ResidenciasService,
              private authenticationService: AuthenticationService,
              private permissao: PermissoesService
              ) { }

  ngOnInit() {

    this.pag = parseInt(this.route.snapshot.paramMap.get('page'));

    if(this.pag === null || isNaN(this.pag))
      this.pag = 1;
    this.acao = this.route.snapshot.paramMap.get('acao');
    this.codigo = this.route.snapshot.paramMap.get('codigo');
    this.ticket = this.route.snapshot.paramMap.get('ticket');

    let modulos: string[] = [];
    let funcionalidades: string[] = [];

    if(this.authenticationService.currentUserValue){
      
      if(this.acao != "create" && this.acao != "novo2"){

          modulos.push('4');
          funcionalidades.push('10');
      
          this.create = false;
          if(this.ticket){
            this.getResidenciaByTicket(this.ticket);
          }else
            this.getResidenciaById(this.codigo);

          this.permissao.getPermissao(modulos, funcionalidades)
            .subscribe(
              data=>{
                this.perfil = data;
              }, err=>{
                console.log(err['erros']);
              }
            );
      }else{

        modulos.push('4');
        funcionalidades.push('9');

        this.create = true;

        this.permissao.getPermissao(modulos, funcionalidades)
          .subscribe(
            data=>{
              this.perfil = data;
            }, err=>{
              console.log(err['erros']);
            }
          );
      }
    }else{
      this.router.navigate(['/login']);
    }

  }

  postNovaResidenciaAmqp(residencia: Residencia){

    let count: number = 0;
    this.msgModal = "Registro inserido com sucesso!";

    this.residenciaService.postNovaResidenciaAmqp(residencia)
      .subscribe(async data => {
        this.residencia = data;
        this.acao = 'view';
        this.open('customModal1');
        //console.log(this.residencia.ticket);
        //this.getResidenciaByTicket(this.residencia.ticket);
        this.router.navigate(['/residencia/view/ticket/', this.residencia.ticket]);
      },err=>{
        this.erros = err['erros'];
      });

  }

  putResidencia(residencia: Residencia, id: string){

    this.msgModal = "Registro atualizado com sucesso!";

    this.residenciaService.putResidencia(residencia, id)
      .subscribe(data => {
        this.residencia = data;
        this.open('customModal1');
        this.acao = 'view';
        this.router.navigate(['/residencia/view/' + id]);
      },err => {
          this.erros = err['erros'];
      });

  }

  getResidenciaById(codigo: string) {

    this.requestFilterDto = new ResidenciasFilterModel();
    this.setCamposDefault(this.requestFilterDto);
    this.residencias = null;

    if(codigo)
      this.requestFilterDto.id = codigo;

    this.residenciasService.residencias(this.requestFilterDto)
      .subscribe(
        data=>{
          this.residencias = data;
          this.residencias.residencias.forEach(r => {
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

  setCamposDefault(request: ResidenciasFilterModel): ResidenciasFilterModel{

    request.detalhaMorador = true;
    request.content = false;

    return request;

  }

  getResidenciaByTicket(ticket: string) {
    
    if(ticket !== null)
      let count: number = 0;
      this.requestFilterDto = new ResidenciasFilterModel();
      this.residencias.residencias = [];
      
      this.requestFilterDto.guide = ticket;

      do{

        this.residenciasService.residencias(this.requestFilterDto)
          .subscribe(
            data=>{
              this.residencias = data;
              this.residencias.residencias.forEach(r => {
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
        await delay(1000);
        count++;
      }
      while(this.residencias.residencias.length === 0 && count < 10);
    
    return this.residencias;

  }

  editResidencia(id: string){

    this.acao = 'edit';
    this.router.navigate(['/residencia/edit/', id]);

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

    this.router.navigate([`/morador/view/`, codigo])

  }

  cancelar(){

    this.router.navigate(['residencias']);

  }

  cancelarEdit(){

    this.acao = 'view';
    this.router.navigate([`/residencia/view/`, this.codigo]);

  }

  pageChanged(event){
    this.pag = event;
  }

  open(id: string) {

    this.erros = null;
    $('#' + id).modal('show');
    
  }

  close(id: string) {
    $('#' + id).modal('hide');
  }

}
function subscribe(arg0: (data: any) => void, arg1: (err: any) => void) {
  throw new Error('Function not implemented.');
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

