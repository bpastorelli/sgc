import { ErroRegistro } from 'src/app/_models/erro-registro';
import { Residencia } from './../residencias/residencias.model';
import { VincularMoradorService } from './vincular-morador.service';
import { Component, OnInit } from '@angular/core';
import { MoradoresService } from '../moradores/moradores.service';
import { Moradores } from '../moradores/moradores.model';
import { VinculoResidencia } from './vincular-morador.model';
import { Publisher } from '../_models/publisher';
import { AuthenticationService } from '../_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResidenciasService } from '../residencias/residencias.service';
import { ResidenciasFilterModel } from '../residencias/residencias-filter.model';
import { ResidenciaResponse } from '../residencias/residencia-response.model';

@Component({
  selector: 'app-vincular-morador',
  templateUrl: './vincular-morador.component.html'
})

export class VincularMoradorComponent implements OnInit {

  ticket: string;
  guide = {} as Publisher;
  usuarios: Moradores[] = [];
  residencias: ResidenciaResponse[] = [];

  erros: ErroRegistro[] = [];

  requestFilterDto: ResidenciasFilterModel;

  errorMessage;

  constructor(
    private usuariosService: MoradoresService,
    private residenciasService: ResidenciasService,
    private vinculoService: VincularMoradorService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

      if(this.authenticationService.currentUserValue){
        this.getUsuarios(1);
        this.getResidencias("0", null, "0");
      }else{
        this.router.navigate(['/login']);
      }
  }

  postVinculo(vinculo: VinculoResidencia){

    this.vinculoService.postVinculo(vinculo)
      .subscribe(data => {
        this.ticket = data.ticket;
        this.router.navigate([`/summary-edit`]);
    },err=>{
        this.errorMessage = err;
    });
  }

  getUsuarios(posicao: number){


    /*this.usuariosService.getMoradoresByPosicao(posicao)
      .subscribe(
        data=>{
          this.usuarios = data;
          this.usuarios.forEach((p, index) => {
            if(Number(p.id) == Number(JSON.parse(localStorage.getItem('idUsuario'))))
              this.usuarios.splice(index, 1);
          });
        }, err=>{
          console.log(err);
        }
      );*/
  }

  getResidencias(id: string, endereco: string, numero: string){

    this.requestFilterDto = new ResidenciasFilterModel();

    if(id)
      this.requestFilterDto.id = id;

    if(endereco)
      this.requestFilterDto.endereco = endereco;

    if(numero)
      this.requestFilterDto.numero = numero;

    this.residenciasService.residencias(this.requestFilterDto)
      .subscribe(
        data=>{
          this.residencias = data;
        }, err=>{
          console.log(err);
        }
      );
  }

  cancelar(){

    this.router.navigate(['residencias']);

  }

}
