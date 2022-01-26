import { Cep } from './../../cep/cep.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CepService } from 'src/app/cep/cepService.service';
import { Moradores } from 'src/app/moradores/moradores.model';
import { Residencia } from '../residencias.model';
import { ResidenciasService } from '../residencias.service';
import { ResidenciaService } from './residencia.service';
import { AuthenticationService } from './../../_services/authentication.service';

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
  public residencia: Residencia
  public residencias: Residencia[]
  public moradoresVinculados: Moradores[]

  logradouroResp: string;
  bairroResp: string;
  localidadeResp: string;
  ufResp: string;
  error = '';

  pag : Number = 1;
  contador : Number = 5;

  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private cepService: CepService,
              private residenciaService: ResidenciaService,
              private residenciasService: ResidenciasService,
              private authenticationService: AuthenticationService

              ) { }

  ngOnInit() {

    this.acao = this.route.snapshot.paramMap.get('acao');
    this.codigo = this.route.snapshot.paramMap.get('codigo');

    if(this.authenticationService.currentUserValue){
      if(this.codigo != "create" && this.codigo != "novo"  && this.acao === null){
          this.create = false;
          this.getResidenciaById(this.codigo);
          this.getMoradoresVinculados(this.codigo);
      }
    }else{
      this.router.navigate(['/login']);
    }

  }

  postResidencia(residencia: Residencia){

    this.residenciaService.postResidencia(residencia)
      .subscribe(data => {
        this.residencia = data;
        this.router.navigate(['/summary-add']);
      },err=>{
        this.errorMessage = err;
      });

  }

  postNovaResidencia(residencia: Residencia){

    this.residenciaService.postNovaResidencia(residencia)
      .subscribe(data => {
        this.residencia = data;
        this.router.navigate(['/summary-add']);
      },err=>{
          this.errorMessage = err;
      });

  }

  postNovaResidenciaAmqp(residencia: Residencia){

    console.log(residencia);

    this.residenciaService.postNovaResidenciaAmqp(residencia)
      .subscribe(data => {
        this.residencia = data;
        this.router.navigate(['/summary-add']);
      },err=>{
          this.errorMessage = err;
      });

  }

  putResidencia(residencia: Residencia, id: string){

    this.residenciaService.putResidencia(residencia, id)
      .subscribe(data => {
        this.residencia = data;
        this.router.navigate(['/summary-edit']);
      },err => {
          this.errorMessage = err;
      });

  }

  getResidenciaById(codigo: string) {

    this.residenciasService.residencias(codigo, null, "0")
      .subscribe(
        data=>{
          this.residencias = data;
          this.residencias.forEach(r => {
            if(r.endereco.toString() != null){
                this.logradouroResp = r.endereco.toUpperCase();
                this.bairroResp = r.bairro.toUpperCase();
                this.localidadeResp = r.cidade.toUpperCase();
                this.ufResp = r.uf.toUpperCase();
            }else{
                this.getCep(r.cep)
            }
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

    console.log(`O cep é ${cep}`);

    if(cep != ""){
        console.log('Vai buscar o CEP')
        this.cepService.getCep(cep)
          .subscribe(
            data=>{
              this.cepResponse = data;
              this.logradouroResp = data.logradouro.toUpperCase();
              this.bairroResp = data.bairro.toUpperCase();
              this.localidadeResp = data.localidade.toUpperCase();
              this.ufResp = data.uf.toUpperCase();
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

  cancelar(){

    this.router.navigate(['residencias']);

  }

  pageChanged(event){
    this.pag = event;
  }

}
