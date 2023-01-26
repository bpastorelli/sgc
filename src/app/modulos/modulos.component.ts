import { ModulosFilterModel } from './modulos-filter.model';
import { properties } from 'src/properties/properties';
import { AuthenticationService } from '../_services/authentication.service';
import { Modulo } from './modulo.model';
import { ModulosService } from './modulos.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html'
})
export class ModulosComponent implements OnInit {

  public modulos: Modulo[];

  pag : Number = 1 ;
  contador : Number = properties.itemsPerPage;

  requestFilter: ModulosFilterModel;

  constructor(
    private modulosService: ModulosService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    if(this.authenticationService.currentUserValue){
      this.getModulos();
    }else{
      this.router.navigate(['/login']);
    }

  }

  getModulos(id?: string, descricao?: string, path?: string, posicao?: number){

    this.requestFilter = new ModulosFilterModel();

    if(id)
      this.requestFilter.id = id;

    if(descricao)
      this.requestFilter.descricao = descricao;

    if(path)
      this.requestFilter.path = path;

    if(posicao)
      this.requestFilter.posicao = posicao;

    this.modulosService.getModulos(this.requestFilter)
      .subscribe(
        data=>{
          this.modulos = data;
        }, err=>{
          console.log(err);
        }
      );
  }

  formatId (n, len) {
    var num = parseInt(n, 10);
    len = parseInt(len, 10);
    return (isNaN(num) || isNaN(len)) ? n : ( 1e10 + "" + num ).slice(-len);
  }

  pageChanged(event){
    this.pag = event;
  }

  posicaoDescricao(posicao: number){

    return posicao == 1 ? "ATIVO" : "INATIVO";

  }

  editModulo(codigo: string){

    this.router.navigate([`/modulo/`, codigo])

  }

}
