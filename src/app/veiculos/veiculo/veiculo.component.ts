import { ActivatedRoute, Route, Router } from '@angular/router';
import { VeiculosService } from './../veiculos.service';
import { Veiculo } from './../veiculo.model';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

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
  errorMessage;

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

    console.log(this.acao);
    console.log(this.codigo);

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

    this.veiculosService.postVeiculo(veiculo)
      .subscribe(data => {
        this.veiculo = data;
        this.id = data.id;
        this.router.navigate([`/summary-add`]);
    },err=>{
        this.errorMessage = err;
    });

  }

  putVeiculo(veiculo: Veiculo, id: string){

    this.veiculosService.putVeiculo(veiculo, id)
      .subscribe(data => {
        this.veiculo = data;
        this.id = data.id;
        this.router.navigate([`/summary-edit`]);
    },err=>{
        this.errorMessage = err;
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


}
