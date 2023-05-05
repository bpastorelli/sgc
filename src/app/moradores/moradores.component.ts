import { ErroRegistro } from 'src/app/_models/erro-registro';
import { FormBuilder } from '@angular/forms';
import { MoradoresFilterModel } from './moradores-filter.model';
import { properties } from './../../properties/properties';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Moradores } from './moradores.model';
import { MoradoresService } from './moradores.service';
import { AuthenticationService } from './../_services/authentication.service';
import { UtilService } from '../util/util.service';

@Component({
  selector: 'app-moradores',
  templateUrl: './moradores.component.html'
})
export class MoradoresComponent implements OnInit {

  @Input() moradores: Moradores[]

  public id: string;

  pag : Number = 1;
  contador : Number = properties.itemsPerPage;

  formGroup: any;

  request: any = {};

  erros: ErroRegistro[] = [];

  requestDto: MoradoresFilterModel = new MoradoresFilterModel();

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private utilService: UtilService,
      private moradoresService: MoradoresService,
      private authenticationService: AuthenticationService
    )  { }

  ngOnInit() {

    if(this.authenticationService.currentUserValue){
        this.loadForm();
        this.getMoradores();
        this.router.navigate(['/moradores']);
    }else{
        this.router.navigate(['/login']);
    }

  }

  getMoradores(nome?: string, rg?: string, cpf?: string, email?: string){

    this.requestDto = new MoradoresFilterModel();

    if(nome)
      this.requestDto.nome = nome;

    if(rg)
      this.requestDto.rg = rg;

    if(cpf)
      this.requestDto.cpf = cpf;

    if(email)
      this.requestDto.email = email;

    return this.moradoresService.getMoradores(this.requestDto)
      .subscribe(
        data=>{
          this.moradores = data;
          this.moradores.forEach(morador => {
            morador.id = this.utilService.formatId(morador.id, 6)
            morador.cpf = this.utilService.formatCPF(morador.cpf)
            morador.telefone = this.utilService.formatTelefone(morador.telefone)
            morador.celular = this.utilService.formatCelular(morador.celular)
          });
        }, err=>{
          this.erros = err['erros'];
        }
      );
  }

  getMoradoresByPosicao(posicao){

    this.requestDto = new MoradoresFilterModel();

    if(posicao)
      this.requestDto.posicao = posicao;

    return this.moradoresService.getMoradores(this.requestDto)
      .subscribe(
        data=>{
          this.moradores = data;
        }, err=>{
          console.log(err);
        }
      );

  }

  preparaCamposRequest(item: MoradoresFilterModel){

    if(item.nome)
      this.requestDto.nome = item.nome;

    if(item.cpf)
      this.requestDto.cpf = item.cpf;

    if(item.rg)
      this.requestDto.rg = item.rg;

    if(item.email)
      this.requestDto.email = item.email;

  }

  getIdMorador(codigo: string){

    this.router.navigate([`/morador/`, codigo])

  }

  pageChanged(event){
    this.pag = event;
  }

  loadForm(){

    this.formGroup = this.fb.group({
      nome: [''],
      cpf: [''],
      rg: [''],
      email: [''],

    });

  }

}

