import { Veiculo } from './veiculo.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { VeiculosService } from './veiculos.service';
import { properties } from './../../properties/properties';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html'
})
export class VeiculosComponent implements OnInit {

  public veiculos: Veiculo[];

  pag : Number = 1 ;
  contador : Number = properties.itemsPerPage;

  situacaoCadastral = [
        { id: 1, label: "ATIVO" },
        { id: 0, label: "INATIVO" }];

  constructor(
      private router: Router,
      private veiculosService: VeiculosService,
      private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {

    if(this.authenticationService.currentUserValue){
      this.getVeiculos(null, null, null, 0);
    }else{
      this.router.navigate(['/login']);
    }
  }

  getVeiculos(placa: string, marca: string, modelo: string, ano: number){

    this.veiculosService.getVeiculos(placa, marca, modelo, ano)
        .subscribe(
           data=>{
              this.veiculos = data;
           }, err=>{
              console.log(err);
         }
      );
  }

  editVeiculo(codigo: string){

    this.router.navigate(['/veiculo/', codigo]);

  }

  formatId (n, len) {
    var num = parseInt(n, 10);
    len = parseInt(len, 10);
    return (isNaN(num) || isNaN(len)) ? n : ( 1e10 + "" + num ).slice(-len);
  }

  pageChanged(event){
    this.pag = event;
  }

}
