import { FuncionalidadeFilter } from './../funcionalidade-filter.model';
import { FuncionalidadeRequest } from './../funcionalidadeRequest.model';
import { FuncionalidadeService } from './../funcionalidades.service';
import { Component, OnInit } from '@angular/core';
import { Funcionalidade } from '../funcionalidade.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ModulosService } from 'src/app/modulos/modulos.service';
import { Modulo } from 'src/app/modulos/modulo.model';
import { ModulosFilterModel } from 'src/app/modulos/modulos-filter.model';
import { ErroRegistro } from 'src/app/_models/erro-registro';

@Component({
  selector: 'app-funcionalidade',
  templateUrl: './funcionalidade.component.html',
})
export class FuncionalidadeComponent implements OnInit {

  id: string;
  acao: string;
  codigo: string;
  create: boolean = true;
  pag: Number = 1;

  erros: ErroRegistro[] = [];

  requestFilter: ModulosFilterModel;

  funcionalidadeRequestFilter: FuncionalidadeFilter;

  public modulos: Modulo[];
  public funcionalidade: Funcionalidade;
  public funcionalidades: Funcionalidade[] = [];
  public funcionalidadeRequest: FuncionalidadeRequest[] = [];

  situacaoCadastral = [
    { id: 1, label: "ATIVO" },
    { id: 0, label: "INATIVO" }];

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private modulosService: ModulosService,
      private funcionalidadeService: FuncionalidadeService,
      private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.acao = this.route.snapshot.paramMap.get('acao');
    this.codigo = this.route.snapshot.paramMap.get('codigo');

    if(this.authenticationService.currentUserValue){
      this.getModulos(null, null, null, 1);
      if(this.codigo != "create" && this.codigo != "novo"  && this.acao === null){
          this.create = false;
          this.getFuncionalidadeById(this.codigo);
      }
    }else{
        this.router.navigate(['/login']);
    }
  }

  getFuncionalidadeById(id: string){

    this.funcionalidadeRequestFilter = new FuncionalidadeFilter();

    if(id)
      this.funcionalidadeRequestFilter.id = id;

    this.funcionalidadeService.getFuncionalidades(this.funcionalidadeRequestFilter)
      .subscribe(
        data=>{
          this.funcionalidades = data;
        }, err=>{
          console.log(err);
        }
      );
  }

  putFuncionalidade(funcionalidadeEdit: FuncionalidadeRequest){

    this.funcionalidadeService.putFuncionaliade(Number(this.codigo), funcionalidadeEdit)
      .subscribe(data => {
        this.funcionalidade = data;
        this.router.navigate([`/summary-edit`]);
      },
      (err) =>{
          this.erros = err['erros'];
      });
  }

  postFuncionalidade(funcionalidadeCreate: FuncionalidadeRequest){

    this.funcionalidadeService.postFuncionalidade(funcionalidadeCreate)
      .subscribe(data => {
        this.funcionalidade = data;
        this.router.navigate([`/summary-add`]);
      },
      (err) =>{
        this.erros = err['erros'];
      });

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
          this.erros = err['erros'];
        }
      );
  }

  cancelar(){

    this.router.navigate(['funcionalidades'])

  }

}
