import { FuncionalidadeRequest } from './funcionalidadeRequest.model';
import { Funcionalidade } from './funcionalidade.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';

@Injectable()
export class FuncionalidadeService {

  constructor(private http: HttpClient){}

    // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getFuncionalidades(id: number, idModulo: number, descricao: string, posicao: number): Observable<Funcionalidade[]> {

    return this.http.get<Funcionalidade[]>(`${environment.apiUrl}/access/funcionalidade/filtro?id=${id}&idModulo=${idModulo}&descricao=${descricao}&posicao=${posicao}&pag=0&ord=descricao&dir=ASC&size=1000000`)

  }

  putFuncionaliade(id: number, funcionalidade: FuncionalidadeRequest){

    return this.http.put<Funcionalidade>(`${environment.apiUrl}/access/funcionalidade/id/${id}`
      , JSON.stringify(funcionalidade)
      , this.httpOptions)
      .pipe(
        map(response => response['data'])
      );

  }

  postFuncionalidade(idModulo: number, funcionalidades: FuncionalidadeRequest[]){

    console.log(funcionalidades);

    return this.http.post<Funcionalidade[]>(`${environment.apiUrl}/access/funcionalidade/incluir/modulo/${idModulo}`
      , JSON.stringify(funcionalidades)
      , this.httpOptions)
      .pipe(
        map(response => response['data'])
      );

  }

}
