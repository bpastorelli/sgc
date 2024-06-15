import { ModulosFilterModel } from './../modulos-filter.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErroRegistro } from 'src/app/_models/erro-registro';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Modulo } from '../modulo.model';
import { ModulosService } from '../modulos.service';
import { PermissoesService } from 'src/app/_services/permissoes.service';
import { PerfilFuncionalidade } from 'src/app/acessos-funcionalidades/acesso-funcionalidade.model';

declare var $: any;

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

  title = "Cadastro de Módulos";

  mensagemModal = "";

  erros: ErroRegistro[] = [];

  public modulos: Modulo[] = [];
  public modulo = {} as Modulo[];

  requestFilter: ModulosFilterModel;

  perfil: PerfilFuncionalidade[] = [];

  situacaoCadastral = [
    { id: 1, label: "ATIVO" },
    { id: 0, label: "INATIVO" }];

  constructor(

    private authenticationService: AuthenticationService,
              private modulosService: ModulosService,
              private router: Router,
              private route: ActivatedRoute,
              private permissao: PermissoesService

  ) { }

  ngOnInit(): void {

    this.acao = this.route.snapshot.paramMap.get('acao');
    this.codigo = this.route.snapshot.paramMap.get('codigo');

    let modulos: string[] = [];
    let funcionalidades: string[] = [];
    
    if(this.authenticationService.currentUserValue){
      if(this.acao != "create" && this.acao != "novo"){

          modulos.push('1');
          funcionalidades.push('3','5');

          this.create = false;
          this.getModuloById(this.codigo);
          this.permissao.getPermissao(modulos, funcionalidades)
          .subscribe(
            data=>{
              this.perfil = data;
            }, err=>{
              console.log(err['erros']);
            }
          );
      }else{

        modulos.push('1');
        funcionalidades.push('5');

        this.create = true;
        this.permissao.getPermissao(modulos, funcionalidades)
        .subscribe(
          data=>{
            this.perfil = data;
          }, err=>{
            console.log(err['erros']);
          }
        );
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

  editModulo(id: string){

    this.acao = 'edit';
    this.router.navigate(['/modulo/edit/', id]);

  }

  putModulo(moduloEdit: Modulo){

    this.mensagemModal = "Registro atualizado com sucesso!";

    this.modulosService.putModulo(moduloEdit, Number(this.codigo))
      .subscribe(data => {
        this.modulo = data;
        this.acao = 'view';
        this.open('customModal1');
        this.router.navigate(['/modulo/view/' + Number(this.codigo)]);
      },
      (err) =>{
          this.erros = err['erros'];
      });

  }

  postModulo(moduloCreate: Modulo){

    this.mensagemModal = "Registro inserido com sucesso!";

    this.modulosService.postModulo(moduloCreate)
      .subscribe(data => {
        this.modulo = data;
        this.acao = 'view';
        //this.open('customModal1');
        //this.router.navigate(['/modulo/view/' + Number(this.modulo[0].id)]);
        this.router.navigate(['/modulos/' + moduloCreate.descricao]);
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

  open(id: string) {

    this.erros = null;
    $('#' + id).modal('show');
    
  }

  close(id: string) {
    $('#' + id).modal('hide');
  }

}
