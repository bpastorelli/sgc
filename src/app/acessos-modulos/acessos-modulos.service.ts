import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AcessosModulos } from './acessos-modulos.model';

import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { AcessosModulosRequest } from './acessos-modulos-request.model';

@Injectable()
export class AcessoModuloService {

  constructor(private http: HttpClient){}

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getAcessosModulos(idUsuario: number): Observable<AcessosModulos[]> {

    return this.http.get<AcessosModulos[]>(`${environment.apiUrl}/access/acessoModulo/filtroPorUsuario?idUsuario=${idUsuario}&posicao=1&pag=0&size=1000000&ord=id&dir=ASC`)

  }

  putAcessoModulo(perfil: AcessosModulosRequest[], idUsuario: number){

    return this.http.put<AcessosModulosRequest>(`${environment.apiUrl}/access/acessoModulo/idUsuario/${idUsuario}`
      , JSON.stringify(perfil)
      , this.httpOptions)
      .pipe(
        map(response => response['data'])
      );

  }

}
