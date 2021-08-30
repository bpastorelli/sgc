import { FuncionalidadeRequest } from './../funcionalidadeRequest.model';
import { FuncionalidadeService } from './../funcionalidades.service';
import { Component, OnInit } from '@angular/core';
import { Funcionalidade } from '../funcionalidade.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ModulosService } from 'src/app/modulos/modulos.service';
import { Modulo } from 'src/app/modulos/modulo.model';

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
  errorMessage;

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
      this.getModulos(0, null, null, 1);
      if(this.codigo != "create" && this.codigo != "novo"  && this.acao === null){
          this.create = false;
          this.getFuncionalidadeById(Number(this.codigo));
      }
    }else{
        this.router.navigate(['/login']);
    }
  }

  getFuncionalidadeById(id: number){

    this.funcionalidadeService.getFuncionalidades(id, 0, null, -1)
      .subscribe(
        data=>{
          this.funcionalidades = data;
          console.log(this.funcionalidades);
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
          this.errorMessage = err;
      });
  }

  postFuncionalidade(idModulo: number, funcionalidadeCreate: FuncionalidadeRequest){

    this.funcionalidadeRequest.push(funcionalidadeCreate);

    this.funcionalidadeService.postFuncionalidade(idModulo, this.funcionalidadeRequest)
      .subscribe(data => {
        this.funcionalidades = data;
        this.router.navigate([`/summary-add`]);
      },
      (err) =>{
          this.errorMessage = err;
      });

  }

  getModulos(id: number, descricao: string, path: string, posicao: number){

    this.modulosService.getModulos(id, descricao, path, posicao)
      .subscribe(
        data=>{
          this.modulos = data;
        }, err=>{
          console.log(err);
        }
      );
  }

  cancelar(){

    this.router.navigate(['funcionalidades'])

  }

}
