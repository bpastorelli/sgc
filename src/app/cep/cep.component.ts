import { Component, OnInit } from '@angular/core';
import { CepService } from './cepService.service';

@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html'
})
export class CepComponent implements OnInit {

  public errorMessage
  public logradouroResp: string;
  public bairroResp: string;
  public localidadeResp: string;
  public ufResp: string;

  constructor(private cepService: CepService) { }

  ngOnInit() {


  }

  getCep(cep: string){

      if(cep != ""){

        this.cepService.getCep(cep)
          .subscribe(
            data=>{
              this.logradouroResp = data.logradouro;
              this.bairroResp = data.bairro;
              this.localidadeResp = data.localidade;
              this.ufResp = data.uf;
          },err =>{
              this.errorMessage = err.message;
              throw err;
          });

      }

    }
  }
