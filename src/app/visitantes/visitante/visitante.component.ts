import { properties } from './../../../properties/properties';
import { Cep } from './../../cep/cep.model';
import { Component, OnInit } from '@angular/core';
import { CepService } from './../../cep/cepService.service';
import { Visitante } from '../visitante.model';
import { VisitantesService } from './../visitantes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-visitante',
  templateUrl: './visitante.component.html'
})
export class VisitanteComponent implements OnInit {

  id: string
  acao: string;
  codigo: string;
  create: boolean = true;
  pag: Number = 1;
  contador: Number = properties.itemsPerPage;
  errorMessage;

  logradouroResp: string;
  bairroResp: string;
  localidadeResp: string;
  ufResp: string;

  public cepResponse: Cep;
  public visitante: Visitante;
  public visitantes: Visitante[];
  public situacaoCadastral = [
        { id: 1, label: "Ativo" },
        { id: 0, label: "Inativo" }]

  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private cepService: CepService,
              private visitantesService: VisitantesService,
              private authenticationService: AuthenticationService
              ) { }
  ngOnInit() {

    if(this.authenticationService.currentUserValue){

      this.codigo = this.route.snapshot.paramMap.get('codigo');
      if(this.codigo != "create" && this.codigo != "novo"){
          this.create = false;
          this.getVisitanteById(this.codigo);
      }
      console.log(this.create)
    }else{
      this.router.navigate(['/login']);
    }

  }

  postVisitante(visitante: Visitante){

    this.visitantesService.postVisitante(visitante)
      .subscribe(data => {
        this.visitante = data;
        this.router.navigate(['/summary-add']);
    },err=>{
        this.errorMessage = err.message;
        throw err;
    });

  }

  putVisitante(visitante: Visitante, id: string){

    this.visitantesService.putVisitante(visitante, id)
      .subscribe(data => {
        this.visitante = data;
        this.router.navigate(['/summary-edit']);
    },err=>{
        this.errorMessage = err.message;
        throw err;
    });

  }

  getVisitanteById(id: string){

    this.visitantesService.getVisitantes(id, null, null, null)
      .subscribe(
        data=>{
            this.visitantes = data;
            this.visitantes.forEach(v => {
            this.visitantes.forEach(r => {
                if(r.endereco.toString() != null){
                    this.logradouroResp = r.endereco;
                    this.bairroResp = r.bairro;
                    this.localidadeResp = r.cidade;
                    this.ufResp = r.uf;
                }else{
                    this.getCep(v.cep)
                }
              });
            });
        }, err=>{
           this.errorMessage = err.message;
           throw err;
      }
    );
    return this.visitantes;

  }

  getCep(cep: string){

    if(cep.length > 0){
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

  pageChanged(event){
    this.pag = event;
  }

}
