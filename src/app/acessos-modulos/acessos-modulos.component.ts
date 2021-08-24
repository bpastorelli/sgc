import { AcessoModuloService } from './acessos-modulos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { properties } from 'src/properties/properties';
import { Modulo } from '../modulos/modulo.model';
import { ModulosService } from '../modulos/modulos.service';
import { Moradores } from '../moradores/moradores.model';
import { MoradoresService } from '../moradores/moradores.service';
import { AuthenticationService } from '../_services/authentication.service';
import { AcessosModulos } from './acessos-modulos.model';
import { AcessoModulo } from '../_models/acessoModulo';
import { AcessosModulosRequest } from './acessos-modulos-request.model';

@Component({
  selector: 'app-acessos-modulos',
  templateUrl: './acessos-modulos.component.html'
})
export class AcessosModulosComponent implements OnInit {


  pag : Number = 1 ;
  contador : Number = properties.itemsPerPage;

  myForm: FormGroup;
  modulos: Modulo[] = [];
  usuarios: Moradores[] = [];
  perfilModulos: AcessosModulos[] = [];
  selecionados: AcessosModulos[] = [];
  requestList: AcessosModulosRequest[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuariosService: MoradoresService,
    private modulosService: ModulosService,
    private authenticationService: AuthenticationService,
    private acessosModulo: AcessoModuloService,
  ) { }

  ngOnInit(): void {

    this.getUsuarios(1);

  }


  getUsuarios(posicao: number){

    this.usuariosService.getMoradoresByPosicao(posicao)
      .subscribe(
        data=>{
          this.usuarios = data;
        }, err=>{
          console.log(err);
        }
      );

  }

  getAcessosModulo(idUsuario: number){

    console.log(idUsuario);

    this.acessosModulo.getAcessosModulos(idUsuario)
      .subscribe(
        data=>{
          this.perfilModulos = data;
        }, err=>{
          console.log(err);
        }
      );

  }

  addAcesso(acesso: AcessoModulo, isChecked: boolean) {

    if(isChecked) {
        acesso.acesso = true;
    } else {
        acesso.acesso = false;
    }

    this.selecionados.push(acesso);

  }

  putAcessos(idUsuario: number){

    this.selecionados.forEach(x => {

      let perfil = new AcessosModulosRequest();
      perfil.idModulo = x.idModulo;
      perfil.acesso = x.acesso;
      this.requestList.push(perfil);

  });

  this.acessosModulo.putAcessoModulo(this.requestList, idUsuario)
    .subscribe(data => {
      this.acessosModulo = data
      this.router.navigate([`/summary-edit`]);
    },
    (err) =>{
        console.log(err);;
    });

    this.requestList = [];
    this.selecionados = [];

  }

  cancelar(){

    this.router.navigate(['/'])

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
