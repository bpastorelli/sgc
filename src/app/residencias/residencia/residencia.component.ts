import { Cep } from './../../cep/cep.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CepService } from 'src/app/cep/cepService.service';
import { Moradores } from 'src/app/moradores/moradores.model';
import { Residencias } from '../residencias.model';
import { ResidenciasService } from '../residencias.service';
import { ResidenciaService } from './residencia.service';

@Component({
  selector: 'app-residencia',
  templateUrl: './residencia.component.html'
})
export class ResidenciaComponent implements OnInit {

  create: boolean = true;
  errorMessage;
  acao: string;
  codigo: string;
  residenciaId: string;

  public cepResponse: Cep
  public residencia: Residencias
  public residencias: Residencias[]
  public moradoresVinculados: Moradores[]

  logradouroResp: string;
  bairroResp: string;
  localidadeResp: string;
  ufResp: string;

  pag : Number = 1;
  contador : Number = 5;

  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private cepService: CepService,
              private residenciaService: ResidenciaService,
              private residenciasService: ResidenciasService) { }

  ngOnInit() {

    this.acao = this.route.snapshot.paramMap.get('acao');
    this.codigo = this.route.snapshot.paramMap.get('codigo');

    console.log(`acao=${this.acao}`);
    console.log(`create=${this.create}`)
    console.log(`codigo=${this.codigo}`)

    if(this.codigo != "create" && this.codigo != "novo"  && this.acao === null){
        this.create = false;
        this.getResidenciaById(this.codigo);
        this.getMoradoresVinculados(this.codigo);
    }

  }

  postResidencia(residencia: Residencias){

    this.residenciaService.postResidencia(residencia)
      .subscribe(data => {
        this.residencia = data;
        this.router.navigate(['/morador-summary']);
      },err=>{
        this.errorMessage = err.message;
        throw err;
      });

  }

  postNovaResidencia(residencia: Residencias){

    console.log(residencia);

    this.residenciaService.postNovaResidencia(residencia)
      .subscribe(data => {
        this.residencia = data;
        this.router.navigate(['/morador-summary']);
      },err=>{
        this.errorMessage = err.message;
        throw err;
      });

  }

  putResidencia(residencia: Residencias, id: string){

    console.log(`Código de residecia ${id}`)

    this.residenciaService.putResidencia(residencia, id)
      .subscribe(data => {
        this.residencia = data;
        this.router.navigate(['/summary-edit']);
      },err=>{
        this.errorMessage = err.message;
        throw err;
      });

  }

  getResidenciaById(codigo: string) {

    this.residenciasService.residencias(codigo, null, null, "0")
      .subscribe(
        data=>{
          console.log(data);
          this.residencias = data;
          this.residencias.forEach(r => {
            console.log(r.cep)
            this.getCep(r.cep)
          });
        }, err=>{
          console.log(err);
        }
    );
    return this.residencias;

  }

  getMoradoresVinculados(codigo: string){

    this.residenciaService.getMoradoresVinculados(codigo)
      .subscribe(
          data=>{
              console.log(data);
              this.moradoresVinculados = data;
          }, err=>{
            console.log(err);
          }
      );
      return this.moradoresVinculados;

  }

  getCep(cep: string){

    if(cep != ""){

      this.cepService.getCep(cep)
        .subscribe(
          data=>{
            this.cepResponse = data;
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

  getIdMorador(codigo: string){

    console.log(`Código enviado: ${codigo}`)
    this.router.navigate([`/morador/`, codigo])

  }

  pageChanged(event){
    this.pag = event;
  }

}
