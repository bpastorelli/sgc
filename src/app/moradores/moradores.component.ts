import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Moradores } from './moradores.model';
import { MoradoresService } from './moradores.service';

@Component({
  selector: 'app-moradores',
  templateUrl: './moradores.component.html'
})
export class MoradoresComponent implements OnInit {

  @Input() moradores: Moradores[]

  public id: string;

  pag : Number = 1;
  contador : Number = 20;

  constructor(private moradoresService: MoradoresService, private router: Router)  { }

  ngOnInit() {

    this.getMoradores("0", null, null, null, null)

  }

  getMoradores(codigo: string, nome: string, cpf: string, rg: string, email: string){

    return this.moradoresService.getMoradores(codigo, nome, cpf, rg, email)
      .subscribe(
        data=>{
          this.moradores = data;
          console.log(data)
        }, err=>{
          console.log(err);
        }
      );

  }

  getIdMorador(codigo: string){

    console.log(`Código enviado: ${codigo}`)
    this.router.navigate([`/morador/`, codigo])

  }

  pageChanged(event){
    this.pag = event;
  }

  formatId (n, len) {
    var num = parseInt(n, 10);
    len = parseInt(len, 10);
    return (isNaN(num) || isNaN(len)) ? n : ( 1e10 + "" + num ).slice(-len);
  }

  formatCPF(cpf: string){

    var p1 = cpf.substring(0,3)
    var p2 = cpf.substring(6,3)
    var p3 = cpf.substring(9,6)
    var p4 = cpf.substring(11,9)

    return p1+"."+p2+"."+p3+"-"+p4

  }

  formatTelefone(telefone: string){

    if(telefone.length === 10){

      var p1 = telefone.substring(0,2);
      var p2 = telefone.substring(2,6);
      var p3 = telefone.substring(6,11);

      return `(${p1}) ${p2}-${p3}`;
    }else{
      return telefone;
    }

  }

  formatCelular(celular: string){

    if(celular.length === 11){

      var p1 = celular.substring(0,2);
      var p2 = celular.substring(2,7);
      var p3 = celular.substring(7,12);

      return `(${p1}) ${p2}-${p3}`;
    }else if(celular.length === 10){

      var p1 = celular.substring(0,2);
      var p2 = celular.substring(2,6);
      var p3 = celular.substring(6,11);

      return `(${p1}) ${p2}-${p3}`;
    }else{
      return celular;
    }

  }

}

