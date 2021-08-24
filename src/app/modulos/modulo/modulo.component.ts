import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  errorMessage;

  public modulos: Modulo[] = [];
  public modulo: Modulo;

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
          this.getModuloById(Number(this.codigo));
      }
    }else{
        this.router.navigate(['/login']);
    }

  }

  getModuloById(codigo: number){


    this.modulosService.getModulos(codigo, null, null, -1)
      .subscribe(
        data=>{
          this.modulos = data;
        }, err=>{
          console.log(err);
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
          this.errorMessage = err;
      });

  }

  postModulo(moduloCreate: Modulo){

    this.modulosService.postModulo(moduloCreate)
      .subscribe(data => {
        this.modulo = data;
        this.router.navigate([`/summary-add`]);
      },
      (err) =>{
          this.errorMessage = err;
      });

  }

  cancelar(){

    this.router.navigate(['modulos'])

  }

  pageChanged(event){
    this.pag = event;
  }

}
