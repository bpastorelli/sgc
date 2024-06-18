import { properties } from './../../properties/properties';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { ResidenciasService } from './residencias.service';
import { ErroRegistro } from '../_models/erro-registro';
import { ResidenciasFilterModel } from './residencias-filter.model';
import { ResidenciaResponse } from './residencia-response.model';
import { PerfilFuncionalidade } from '../acessos-funcionalidades/acesso-funcionalidade.model';
import { PerfilRequestModel } from './perfil-request.model';
import { PermissoesService } from '../_services/permissoes.service';
import { Funcionalidade } from '../funcionalidades/funcionalidade.model';

@Component({
  selector: 'app-residencias',
  templateUrl: './residencias.component.html'
})
export class ResidenciasComponent implements OnInit {

  public inclusaoVisita: any = false;
  public inclusaoMorador: any = false;

  residencias: ResidenciaResponse[] = [];

  public ticket: string;

  pag : Number = 1 ;
  contador : Number = properties.itemsPerPage;

  erros: ErroRegistro[] = [];

  perfis = {} as PerfilFuncionalidade[];
  perfilVisita = {} as PerfilFuncionalidade;
  perfilMorador = {} as PerfilFuncionalidade;

  title = "Cadastro de Residências";

  requestDto: ResidenciasFilterModel = new ResidenciasFilterModel();

  constructor(
      private permissaoService: PermissoesService,
      private residenciasService: ResidenciasService,
      private authenticationService: AuthenticationService,
      private router: Router  ) { }

  ngOnInit() {

    if(this.authenticationService.currentUserValue){  
      this.getAcessoMorador('3','7');
    }else{
      this.router.navigate(['/login']);
    }

  }

  getResidencias(codigo?: string, endereco?: string, numero?: string){

    this.requestDto = new ResidenciasFilterModel();
    this.perfis = [] as PerfilFuncionalidade[];
    this.perfilVisita = new PerfilFuncionalidade();

    if(codigo)
      this.requestDto.id = codigo;
    
    if(endereco)
      this.requestDto.endereco = endereco;

    if(numero)
      this.requestDto.numero = numero;

    this.residenciasService.residencias(this.requestDto)
    .subscribe(
      data=>{
        this.residencias = data;
      }, err=>{
        this.erros = err['erros'];
      }
    );

  }

  getAcessoVisita(modulo: string, funcionalidade: string){

    let modulos: string[] = [];
    let funcionalidades: string[] = [];

    modulos.push(modulo);
    funcionalidades.push(funcionalidade);

    this.permissaoService.getPermissao(modulos, funcionalidades)
      .subscribe(
        data =>{
            if(data.length > 0){
              this.inclusaoVisita = data[0].inclusao;
            }else{
              this.inclusaoVisita = false;
            }
            this.getResidencias();
        }, err=>{
          console.log(err['erros']);
        }
      );

  }

  getAcessoMorador(modulo: string, funcionalidade: string){

    let modulos: string[] = [];
    let funcionalidades: string[] = [];

    modulos.push(modulo);
    funcionalidades.push(funcionalidade);

    this.permissaoService.getPermissao(modulos, funcionalidades)
      .subscribe(
        data =>{
            if(data.length > 0){
              this.inclusaoMorador = data[0].inclusao;            
            }else{
              this.inclusaoMorador = false;
            }
            this.getAcessoVisita('6','14');
        }, err=>{
          console.log(err['erros']);
        }
      );

  }

  getResidenciaById(codigo: string){

    this.requestDto = new ResidenciasFilterModel();

    if(codigo)
      this.requestDto.id = codigo;

    this.residenciasService.residencias(this.requestDto)
    .subscribe(
        data=>{
          this.residencias = data;
        }, err=>{
          this.erros = err['erros'];
        }
    );
    return this.residencias;

  }

  incluirMorador(codigo: string){

    this.router.navigate([`morador/create/residencia/`, codigo])

  }

  incluirVisita(codigo: string){

    this.router.navigate([`visita/residencia/`, codigo])

  }

  editResidencia(codigo: string){

    this.router.navigate([`/residencia/view/`, codigo])

  }

  viewResidencia(codigo: string){

    this.router.navigate([`/residencia/view/`, codigo])

  }

  pageChanged(event){
    this.pag = event;
  }

  formatId (n, len) {
    var num = parseInt(n, 10);
    len = parseInt(len, 10);
    return (isNaN(num) || isNaN(len)) ? n : ( 1e10 + "" + num ).slice(-len);
  }

}
