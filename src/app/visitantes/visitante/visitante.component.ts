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
import { ErroRegistro } from 'src/app/_models/erro-registro';
import { PermissoesService } from 'src/app/_services/permissoes.service';
import { PerfilFuncionalidade } from 'src/app/acessos-funcionalidades/acesso-funcionalidade.model';

declare var $: any;

@Component({
  selector: 'app-visitante',
  templateUrl: './visitante.component.html'
})

export class VisitanteComponent implements OnInit {

  id: string;
  rg: string;
  ticket: string;
  residencia: string;
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
  perfil = {} as PerfilFuncionalidade[];

  title = 'Cadastro de Visitantes';

  public cepResponse: Cep;
  public visit: Visitante;
  public visitantes: Visitante[];
  public veiculosVinculados: Veiculo[];
  public situacaoCadastral = [
        { id: 1, label: "ATIVO" },
        { id: 0, label: "INATIVO" }]

  request: VisitanteFilterModel;

  erros: ErroRegistro[] = [];

  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private cepService: CepService,
              private visitantesService: VisitantesService,
              private veiculosService: VeiculosService,
              private authenticationService: AuthenticationService,
              private permissao: PermissoesService
              ) { }
  ngOnInit() {

    if(this.authenticationService.currentUserValue){
      this.rg = this.route.snapshot.paramMap.get('rg');
      this.residencia = this.route.snapshot.paramMap.get('residencia');
      this.codigo = this.route.snapshot.paramMap.get('codigo');
      this.acao = this.route.snapshot.paramMap.get('acao');
      this.ticket = this.route.snapshot.paramMap.get('ticket');

      //console.log(this.acao);
      let modulos: string[] = [];
      let funcionalidades: string[] = [];

      this.close('customModal1');
      if(this.acao != "create" && this.acao != "novo"){
          modulos.push('7');
          funcionalidades.push('18','17');

          this.create = false;
          this.getVisitanteById(this.codigo);
          this.permissao.getPermissao(modulos, funcionalidades)
          .subscribe(
            data=>{
              this.perfil = data;
            }, err=>{
              console.log(err['erros']);
            }
          );
      }else{
        modulos.push('7');
        funcionalidades.push('7','17');

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

  postVisitanteAmqp(visitante: Visitante){

    if(visitante.cpf != null)
      visitante.cpf = visitante.cpf.replace('.','').replace('-','');

    this.visitantesService.postVisitanteAmqp(visitante)
      .subscribe(data => {
        if(this.residencia == null){
          this.id = data.ticket;
          this.router.navigate(['/veiculo/create/visitante/', this.id]);
        }else{
          this.acao = 'view';
          this.open('customModal1');
          this.getVisitanteByTicket(data.ticket);
          this.router.navigate(['/visitante/view/' + this.visitantes[0].id]);
        }
    },err=>{
      this.erros = err['erros'];
    });

  }

  putVisitante(visitante: Visitante, id: string){

    if(visitante.cpf != null)
      visitante.cpf = visitante.cpf.replace('.','').replace('-','');

    this.visitantesService.putVisitante(visitante, id)
      .subscribe(data => {
        this.visit = data;
        this.acao = 'view';
        this.open('customModal2');
        this.router.navigate(['/visitante/view/' + id]);
    },err=>{
      this.erros = err['erros'];
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
          this.erros = err['erros'];
      }
    );
    return this.visitantes;

  }

  async getVisitanteByTicket(ticket: string){

    let count: number = 0;
    this.request = new VisitanteFilterModel();

    if(ticket)
      this.request.guide = ticket;

    do{

      this.visitantesService.getVisitantes(this.request)
        .subscribe(
          data=>{
              this.visitantes = data;
              this.visitantes.forEach(v => {
                  this.getCep(v.cep)
              });
          }, err=>{
            this.erros = err['erros'];
        }
      );

      await delay(1000);
      count++;
    }
    while(this.visitantes.length === 0 && count < 4);

    return this.visitantes;

  }

  getVeiculoByVisitanteId(id: string){

    this.veiculosService.getVeiculosByVisitanteId(id)
      .subscribe(
        data=>{
          this.veiculosVinculados =  data;
        },err=>{
          this.erros = err['erros'];
        }

      );

  }

  editVisitante(codigo: string){

    this.acao = 'edit';
    this.router.navigate(['/visitante/edit/', codigo]);

  }

  editVeiculo(codigo: string){

    this.acao = 'edit';
    this.router.navigate(['/veiculo/view/', codigo]);

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
          this.erros = err['erros'];
        });
    }
  }

  pageChanged(event){
    this.pag = event;
  }

  cancelar(){

    this.router.navigate(['visitantes'])

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

  abreCadastroVisita(rg: string){

    this.router.navigate([`/visita/residencia/${this.residencia}/rg/${rg}`]);

  }

}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
