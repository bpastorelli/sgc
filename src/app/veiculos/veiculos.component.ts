import { Veiculo } from './veiculo.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { VeiculosService } from './veiculos.service';
import { properties } from './../../properties/properties';
import { VeiculoFilterModel } from './veiculo-filter.model';
import { ErroRegistro } from '../_models/erro-registro';
import { UtilService } from '../util/util.service';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html'
})
export class VeiculosComponent implements OnInit {

  public veiculos: Veiculo[];
  
  request: VeiculoFilterModel;

  erros: ErroRegistro[] = [];

  pag : Number = 1 ;
  contador : Number = properties.itemsPerPage;

  situacaoCadastral = [
        { id: 1, label: "ATIVO" },
        { id: 0, label: "INATIVO" }];

  constructor(
      private router: Router,
      private utilService: UtilService,
      private veiculosService: VeiculosService,
      private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {

    if(this.authenticationService.currentUserValue){
      this.getVeiculos(null, null, null, null);
    }else{
      this.router.navigate(['/login']);
    }
  }

  getVeiculos(placa: string, marca: string, modelo: string, ano: number){

    this.request = new VeiculoFilterModel();

    if(placa)
      this.request.placa = placa;

    if(marca)
      this.request.marca = marca;

    if(modelo)
      this.request.modelo = modelo;

    if(ano)
      this.request.ano = ano;

    this.veiculosService.getVeiculos(this.request)
        .subscribe(
           data=>{
              this.veiculos = data;
              this.veiculos.forEach(v => {
                v.placa = this.utilService.formatPlaca(v.placa)
              });
           }, err=>{
              this.erros = err['erros'];
         }
      );
  }

  editVeiculo(codigo: string){

    this.router.navigate(['/veiculo/', codigo]);

  }

  pageChanged(event){
    this.pag = event;
  }

}
