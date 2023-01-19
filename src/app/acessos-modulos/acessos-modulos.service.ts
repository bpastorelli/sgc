import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AcessosModulos } from './acessos-modulos.model';
import { environment } from './../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { AcessosModulosRequest } from './acessos-modulos-request.model';

@Injectable()
export class AcessoModuloService {

  private acessosModuloUrl = environment.protocol + environment.apiUrl;

  constructor(private http: HttpClient){}

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getAcessosModulos(idUsuario: string): Observable<AcessosModulos[]> {

    return this.http.get<AcessosModulos[]>(`${this.acessosModuloUrl}/access/acessoModulo/filtroPorUsuario?idUsuario=${idUsuario}&posicao=1&pag=0&size=1000000&ord=id&dir=ASC`)

  }

  putAcessoModulo(perfil: AcessosModulosRequest[], idUsuario: string){

    return this.http.put<AcessosModulosRequest>(`${this.acessosModuloUrl}/access/acessoModulo/idUsuario/${idUsuario}`
      , JSON.stringify(perfil)
      , this.httpOptions)
      .pipe(
        map(response => response['data'])
      );

  }

}
