import { ActivatedRoute, Router } from '@angular/router';
import { VeiculosService } from './../veiculos.service';
import { Veiculo } from './../veiculo.model';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ErroRegistro } from 'src/app/_models/erro-registro';
import { PermissoesService } from 'src/app/_services/permissoes.service';
import { PerfilFuncionalidade } from 'src/app/acessos-funcionalidades/acesso-funcionalidade.model';

declare var $: any;

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html'
})
export class VeiculoComponent implements OnInit {

  id:           number;
  acao:         string;
  codigo:       string;
  create:       boolean = true
  veiculo:      Veiculo;
  veiculos:     Veiculo[] = [];
  ticket:       string;
  errorMessage;
  pag: Number = 1;
  contador: Number = 5;
  erros: ErroRegistro[] = [];
  perfil = {} as PerfilFuncionalidade[];
  
  title = "Cadastro de Veículos";
  msgModal: string = '';

  situacaoCadastral = [
        { id: 1, label: "ATIVO" },
        { id: 0, label: "INATIVO" }]

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private veiculosService: VeiculosService,
      private authenticationService: AuthenticationService,
      private permissao: PermissoesService
  ) { }

  ngOnInit(): void {

    this.acao = this.route.snapshot.paramMap.get('acao');
    this.codigo = this.route.snapshot.paramMap.get('codigo');
    this.ticket = this.route.snapshot.paramMap.get('ticket');

    let modulos: string[] = [];
    let funcionalidades: string[] = [];
    
    if(this.authenticationService.currentUserValue){
      if(this.acao != "create" && this.acao != "novo"){

        modulos.push('5');
        funcionalidades.push('16');

        this.create = false;
        if(this.ticket){
          this.getVeiculoByTicket(this.ticket);
        }else
          this.getVeiculoById(this.codigo);

        this.permissao.getPermissao(modulos, funcionalidades)
          .subscribe(
            data=>{
              this.perfil = data;
            }, err=>{
              console.log(err['erros']);
            }
          );
      }else{

        modulos.push('5');
        funcionalidades.push('15');

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

  postVeiculo(veiculo: Veiculo){

    let count: number = 0;

    if(this.codigo != "create")
      veiculo.ticketVisitante = this.codigo;

    this.veiculosService.postVeiculo(veiculo)
      .subscribe(async data => {
        this.ticket = data.ticket;
        this.acao = 'view';
        this.open('customModal1');

        do{
          this.getVeiculoByTicket(this.ticket);
          await delay(1000);
          count++;
        }
        while(this.veiculos.length === 0 && count < 4);
    },err=>{
        this.erros = err['erros'];
    });

  }

  editVeiculo(id: string){

    this.acao = 'edit';
    this.router.navigate(['/veiculo/edit/', id]);

  }

  postVeiculoAmqp(veiculo: Veiculo){

    this.msgModal = "Registro inserido com sucesso!";

    if(this.codigo != "create")
      veiculo.ticketVisitante = this.codigo;
    
    this.veiculosService.postVeiculoAmqp(veiculo)
      .subscribe(async data => {
        this.ticket = data.ticket;
        this.acao = 'view';
        this.open('customModal1');
        this.getVeiculoByTicket(this.ticket);
        this.router.navigate(['/viculo/view', this.veiculos[0].id]);
    },err=>{
        this.erros = err['erros'];
    });

  }

  putVeiculo(veiculo: Veiculo, id: string){

    this.msgModal = "Registro atualizado com sucesso!";

    this.veiculosService.putVeiculo(veiculo, id)
      .subscribe(data => {
        this.ticket = data.ticket;
        this.acao = 'view';
        this.open('customModal1');
        this.router.navigate(['/veiculo/view/' + id]);
    },err=>{
        this.erros = err['erros'];
    });

  }

  getVeiculoById(id: string){

    this.veiculosService.getVeiculoById(id)
      .subscribe(data => {
        this.veiculos = data;
    },err=>{
        this.errorMessage = err;
    });

  }

  async getVeiculoByTicket(ticket: string){

    let count: number = 0;

    do{
      this.veiculosService.getVeiculoByTicket(ticket)
        .subscribe(data => {
          this.veiculos = data;
      },err=>{
          this.errorMessage = err;
      });
      await delay(1000);
      count++;
    }
    while(this.veiculos.length === 0 && count < 4);

  }

  cancelar(){

    this.router.navigate(['veiculos'])

  }

  editVisitante(codigo: string){

    this.acao = 'view';
    this.router.navigate([`/visitante/view/`, codigo])

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
