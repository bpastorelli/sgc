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

  constructor(
    private modulosService: ModulosService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    if(this.authenticationService.currentUserValue){
      this.getModulos(0, null);
    }else{
      this.router.navigate(['/login']);
    }

  }

  getModulos(id: number, descricao: string){

    this.modulosService.getModulos(id, descricao)
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

}
