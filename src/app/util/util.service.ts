import { Injectable } from "@angular/core";

@Injectable()
export class UtilService {

  constructor() { }

  formatId (n, len) {
    var num = parseInt(n, 10);
    len = parseInt(len, 10);
    return (isNaN(num) || isNaN(len)) ? n : ( 1e10 + "" + num ).slice(-len);
  }

  formatCPF(cpf: string){

    if(cpf.length === 11){
      var p1 = cpf.substring(0,3)
      var p2 = cpf.substring(6,3)
      var p3 = cpf.substring(9,6)
      var p4 = cpf.substring(11,9)
  
      return p1+"."+p2+"."+p3+"-"+p4
    }else{
      return cpf;
    }

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

  formatPlaca(placa: string){

    placa = placa.replace("-", "");

    var p1 = placa.substring(0,3);
    var p2 = placa.substring(3,7);

    placa = `${p1}-${p2}`

    return placa;

  }


}