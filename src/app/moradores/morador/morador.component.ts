import { ResidenciaResponse } from './../../residencias/residencia-response.model';
import { MoradorResponse } from './morador-response.model';
import { Publisher } from './../../_models/publisher';
import { Component, OnInit } from '@angular/core';
import { MoradorService } from './morador.service';
import { Morador } from './../morador/morador.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ErroRegistro } from 'src/app/_models/erro-registro';
import { PermissoesService } from 'src/app/_services/permissoes.service';
import { AcessoFuncionalidade } from 'src/app/_models/acessoFuncionalidade';
import { PerfilFuncionalidade } from 'src/app/acessos-funcionalidades/acesso-funcionalidade.model';

declare var $: any;

@Component({
  selector: 'app-morador',
  templateUrl: './morador.component.html'
})
export class MoradorComponent implements OnInit {

  id: string;
  acao: string;
  codigo: string
  create: boolean = true
  pag: Number = 1;
  contador: Number = 5;
  situacaoAssociadoDefault: number = 0;
  errorMessage;

  erros: ErroRegistro[] = [];

  possuiResidencia: Boolean = false;

  mor = {} as Morador;
  guide = {} as Publisher;
  perfil = {} as PerfilFuncionalidade[];
  moradores: MoradorResponse[] = [];
  residenciasVinculadas: ResidenciaResponse[];
  permissoes = {} as AcessoFuncionalidade;

  title = 'Cadastro de Moradores';
  msgModal: string = '';
  ticket:       string;

  situacaoCadastral = [
        { id: 1, label: "ATIVO" },
        { id: 0, label: "INATIVO" }];
  situacaoAssociacao = [
          { id: 1, label: "SIM" },
          { id: 0, label: "NÃO" }]

  constructor(
              private authenticationService: AuthenticationService,
              private moradorService: MoradorService,
              private router: Router,
              private route: ActivatedRoute,
              private permissao: PermissoesService) { }

  ngOnInit() {

      this.acao = this.route.snapshot.paramMap.get('acao');
      this.codigo = this.route.snapshot.paramMap.get('codigo');
      this.ticket = this.route.snapshot.paramMap.get('ticket');

      let modulos: string[] = [];
      let funcionalidades: string[] = [];

      modulos.push('3');
      funcionalidades.push('7');

      if(this.authenticationService.currentUserValue){
        if(this.acao != "create"){
          this.create = false;

          if(this.ticket){
            this.getMoradorByGuide(this.ticket);
          }else
            this.getMoradorById(this.codigo);

          this.permissao.getPermissao(modulos, funcionalidades)
          .subscribe(
            data=>{
              this.perfil = data;
            }, err=>{
              console.log(err['erros']);
            }
          );
        }else{
          this.create = true;
          this.acao = "create";
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

  postMorador(morador: Morador){

    morador.cpf = morador.cpf.replace('.','').replace('-','');

    this.moradorService.postMorador(morador)
      .subscribe(data => {
        this.mor = data;
        this.id = data.id;
        this.router.navigate(['/residencia/novo/morador/', this.id]);
    },err=>{
        this.erros = err['erros'];
    });

  }

  postMoradorAmqp(morador: Morador, cadastrResidencia: boolean){

    this.msgModal = "Registro incluído com sucesso!";
    this.erros = [];

    morador.cpf = morador.cpf.replace('.','').replace('-','');

    this.moradorService.postMoradorAmqp(morador)
      .subscribe(async data => {
        this.mor = data;
        this.id = data.ticket;
        this.ticket = data.ticket;
        if(cadastrResidencia)
            this.router.navigate(['/residencia/novo2/morador/', this.id]);
        else{
          this.acao = 'view';
          this.open('customModal1');
          this.getMoradorByGuide(this.ticket);
          this.router.navigate(['/morador/view/', this.moradores[0].id]);
        }
    },err=>{
        this.erros = err['erros'];
    });

  }

  editMorador(id: string){

    this.acao = 'edit';
    this.router.navigate(['/morador/edit/', id]);

  }

  putMorador(moradorEdit: Morador, id: string){

    this.msgModal = "Registro atualizado com sucesso!";
    this.erros = [];

    this.moradorService.putMorador(moradorEdit, id)
      .subscribe(data => {
        this.mor = data;
        this.id = data.id;
        if(this.mor.residenciaId != null){
          this.acao = 'view';
          this.open('customModal1');
          this.router.navigate(['/morador/view/' + id]);
        }
        else
          this.router.navigate(['/residencia/novo/morador/', this.id]);
    },
    (err) =>{
      this.erros = err['erros'];
    });

  }

  putMoradorAmqp(moradorEdit: Morador, id: string){

    this.msgModal = "Registro atualizado com sucesso!";

    this.moradorService.putMorador(moradorEdit, id)
      .subscribe(data => {
        this.guide = data.ticket;
        if(this.guide != null && this.possuiResidencia){
          this.acao = 'view';
          this.open('customModal1');
          this.router.navigate(['/morador/view/' + id]);
        }else
          this.router.navigate(['/residencia/novo2/morador/', this.guide]);
    },
    (err) =>{
       this.erros = err['erros'];
    });

  }

  getMoradorById(codigo: string) {

    this.moradorService.getMorador(codigo)
    .subscribe(
      data=>{
        this.moradores = data;
        this.moradores.forEach(morador => {
          if(morador.residencias.length > 0)
            this.possuiResidencia = true;
        });

      }, err=>{
        this.erros = err['erros'];
      }
    );
    return this.moradores;

  }

  getMoradorByTicket(ticket: string) {

    this.moradorService.getTicketMorador(ticket)
      .subscribe(
        data=>{
          this.mor = data;
        }, err=>{
          this.errorMessage = err;
        }
      );


    return this.mor;

  }

  async getMoradorByGuide(ticket:string){

    let count: number = 0;

    do{

      this.moradorService.getTicketMorador(ticket)
      .subscribe(
        data=>{
          this.moradores = data;
          this.moradores.forEach(morador => {
            if(morador.residencias.length > 0)
              this.possuiResidencia = true;
          });

        }, err=>{
          this.erros = err['erros'];
        }
      );
      await delay(1000);
      count++;
    }
    while(this.moradores.length === 0 && count < 4);
    
    return this.moradores;

  }

  getResidenciasVinculados(codigo: string){

    this.moradorService.getResidenciasVinculadas(codigo)
      .subscribe(
          data=>{
            this.residenciasVinculadas = data;
          }, err=>{
            this.errorMessage = err;
          }
      );
      return this.residenciasVinculadas;

  }

  editResidencia(codigo: string){

    this.router.navigate([`/residencia/view/`, codigo])

  }

  cancelar(){

    this.router.navigate(['moradores'])

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

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

