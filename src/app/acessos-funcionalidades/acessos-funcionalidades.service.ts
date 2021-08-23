import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PerfilFuncionalidade } from './acesso-funcionalidade.model';

import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { PerfilFuncionalidadeRequest } from './acesso-funcionalidades-request.model';

@Injectable()
export class AcessoFuncionalidadeService {

  constructor(private http: HttpClient){}

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getAcessosFuncionalidade(idUsuario: number, idModulo: number): Observable<PerfilFuncionalidade[]> {

    return this.http.get<PerfilFuncionalidade[]>(`${environment.apiUrl}/access/acessoFuncionalidade/filtroPorUsuario?idUsuario=${idUsuario}&idModulo=${idModulo}&posicao=1&pag=0&size=1000000&ord=descricao&dir=ASC`)

  }

  putModulo(modulo: PerfilFuncionalidade[], id: number){

    return this.http.put<PerfilFuncionalidade>(`${environment.apiUrl}/access/modulo/idModulo/${id}`
      , JSON.stringify(modulo)
      , this.httpOptions)
      .pipe(
        map(response => response['data'])
      );

  }

  postModulo(perfil: PerfilFuncionalidade[]){

    console.log(perfil);

    return this.http.post<PerfilFuncionalidade>(`${environment.apiUrl}/access/modulo/incluir`
      , JSON.stringify(perfil)
      , this.httpOptions)
      .pipe(
        map(response => response['data'])
      );

  }

  putAcessoFuncionalidade(perfil: PerfilFuncionalidadeRequest[], idUsuario: number, idModulo: number){

    return this.http.put<PerfilFuncionalidade>(`${environment.apiUrl}/access/acessoFuncionalidade/idUsuario/${idUsuario}/idModulo/${idModulo}`
      , JSON.stringify(perfil)
      , this.httpOptions)
      .pipe(
        map(response => response['data'])
      );

  }

  getModulos(){}

}
