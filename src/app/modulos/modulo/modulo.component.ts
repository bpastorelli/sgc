import { ModulosFilterModel } from './../modulos-filter.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErroRegistro } from 'src/app/_models/erro-registro';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Modulo } from '../modulo.model';
import { ModulosService } from '../modulos.service';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html'
})
export class ModuloComponent implements OnInit {

  id: string;
  acao: string;
  codigo: string;
  create: boolean = true;
  pag: Number = 1;

  erros: ErroRegistro[] = [];

  public modulos: Modulo[] = [];
  public modulo: Modulo;

  requestFilter: ModulosFilterModel;

  situacaoCadastral = [
    { id: 1, label: "ATIVO" },
    { id: 0, label: "INATIVO" }];

  constructor(

    private authenticationService: AuthenticationService,
              private modulosService: ModulosService,
              private router: Router,
              private route: ActivatedRoute

  ) { }

  ngOnInit(): void {

    this.acao = this.route.snapshot.paramMap.get('acao');
    this.codigo = this.route.snapshot.paramMap.get('codigo');

    if(this.authenticationService.currentUserValue){
      if(this.codigo != "create" && this.codigo != "novo"  && this.acao === null){
          this.create = false;
          this.getModuloById(this.codigo);
      }
    }else{
        this.router.navigate(['/login']);
    }

  }

  getModuloById(codigo: string){

    this.requestFilter = new ModulosFilterModel();

    if(codigo)
      this.requestFilter.id = codigo;

    this.modulosService.getModulos(this.requestFilter)
      .subscribe(
        data=>{
          this.modulos = data;
        }, err=>{
          this.erros = err['erros'];
        }
      );

  }

  putModulo(moduloEdit: Modulo){

    this.modulosService.putModulo(moduloEdit, Number(this.codigo))
      .subscribe(data => {
        this.modulo = data;
        this.router.navigate([`/summary-edit`]);
      },
      (err) =>{
          this.erros = err['erros'];
      });

  }

  postModulo(moduloCreate: Modulo){

    this.modulosService.postModulo(moduloCreate)
      .subscribe(data => {
        this.modulo = data;
        this.router.navigate([`/summary-add`]);
      },
      (err) =>{
        this.erros = err['erros'];
      });

  }

  cancelar(){

    this.router.navigate(['modulos'])

  }

  pageChanged(event){
    this.pag = event;
  }

}
