import { ActivatedRoute, Router } from '@angular/router';
import { VeiculosService } from './../veiculos.service';
import { Veiculo } from './../veiculo.model';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ErroRegistro } from 'src/app/_models/erro-registro';

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
  veiculos:     Veiculo[];
  ticket:       string;
  errorMessage;
  pag: Number = 1;
  contador: Number = 5;
  erros: ErroRegistro[] = [];

  situacaoCadastral = [
        { id: 1, label: "ATIVO" },
        { id: 0, label: "INATIVO" }]

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private veiculosService: VeiculosService,
      private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {

    this.acao = this.route.snapshot.paramMap.get('acao');
    this.codigo = this.route.snapshot.paramMap.get('codigo');

    if(this.authenticationService.currentUserValue){
      if(this.codigo != "create" && this.codigo != "novo" && this.acao === null){
          this.create = false;
          this.getVeiculoById(this.codigo);
      }
    }else{
        this.router.navigate(['/login']);
    }

  }

  postVeiculo(veiculo: Veiculo){

    veiculo.ticketVisitante = this.codigo;

    this.veiculosService.postVeiculo(veiculo)
      .subscribe(data => {
        this.id = data.ticket;
        this.router.navigate([`/summary-add`]);
    },err=>{
        this.erros = err['erros'];
    });

  }

  postVeiculoAmqp(veiculo: Veiculo){

    veiculo.ticketVisitante = this.codigo;
    this.veiculosService.postVeiculoAmqp(veiculo)
      .subscribe(data => {
        this.id = data.ticket;
        this.router.navigate([`/summary-add`]);
    },err=>{
        this.erros = err['erros'];
    });

  }

  putVeiculo(veiculo: Veiculo, id: string){

    this.veiculosService.putVeiculo(veiculo, id)
      .subscribe(data => {
        this.ticket = data.ticket;
        this.router.navigate([`/summary-edit`]);
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

  cancelar(){

    this.router.navigate(['veiculos'])

  }

  editVisitante(codigo: string){

    this.router.navigate([`/visitante/`, codigo])

  }

  pageChanged(event){
    this.pag = event;
  }

}
