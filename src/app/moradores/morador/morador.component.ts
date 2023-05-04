import { ResidenciaResponse } from './../../residencias/residencia-response.model';
import { MoradorResponse } from './morador-response.model';
import { Publisher } from './../../_models/publisher';
import { Component, OnInit } from '@angular/core';
import { MoradorService } from './morador.service';
import { Morador } from './../morador/morador.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ErroRegistro } from 'src/app/_models/erro-registro';

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
  moradores: MoradorResponse[] = [];
  residenciasVinculadas: ResidenciaResponse[];

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
              private route: ActivatedRoute) { }

  ngOnInit() {

      this.acao = this.route.snapshot.paramMap.get('acao');
      this.codigo = this.route.snapshot.paramMap.get('codigo');

      if(this.authenticationService.currentUserValue){
        if(this.codigo != "create" && this.codigo != "novo"  && this.acao === null){
            this.create = false;
            this.getMoradorById(this.codigo);
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

    this.erros = [];

    morador.cpf = morador.cpf.replace('.','').replace('-','');

    this.moradorService.postMoradorAmqp(morador)
      .subscribe(data => {
        this.mor = data;
        this.id = data.ticket;
        if(cadastrResidencia)
            this.router.navigate(['/residencia/novo2/morador/', this.id]);
        else
          this.router.navigate([`/summary-edit`]);
    },err=>{
        this.erros = err['erros'];
    });

  }

  putMorador(moradorEdit: Morador, id: string){

    this.erros = [];

    this.moradorService.putMorador(moradorEdit, id)
      .subscribe(data => {
        this.mor = data;
        this.id = data.id;
        if(this.mor.residenciaId != null)
          this.router.navigate([`/summary-edit`]);
        else
          this.router.navigate(['/residencia/novo/morador/', this.id]);
    },
    (err) =>{
      this.erros = err['erros'];
    });

  }

  putMoradorAmqp(moradorEdit: Morador, id: string){

    this.moradorService.putMorador(moradorEdit, id)
      .subscribe(data => {
        this.guide = data.ticket;
        if(this.guide != null && this.possuiResidencia)
          this.router.navigate([`/summary-edit`]);
        else
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
          console.log(morador.residencias.length);
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
        console.log(this.mor);
        console.log(this.mor.id);
      }, err=>{
        this.errorMessage = err;
      }
    );
    return this.mor;

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

    this.router.navigate([`/residencia/`, codigo])

  }

  cancelar(){

    this.router.navigate(['moradores'])

  }

  pageChanged(event){
    this.pag = event;
  }

}

