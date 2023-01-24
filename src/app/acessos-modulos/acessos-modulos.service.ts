import { BaseService } from 'src/app/_services/base.service';
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
export class AcessoModuloService extends BaseService {

  private acessosModuloUrl = environment.protocol + environment.apiUrl;

  constructor(private http: HttpClient){
    super();
  }

  getAcessosModulos(idUsuario: string): Observable<AcessosModulos[]> {

    return this.http.get<AcessosModulos[]>(`${this.acessosModuloUrl}/access/perfil/modulo/filtro?idUsuario=${idUsuario}&posicao=1&content=true&page=0&size=1000000&ord=id&dir=ASC`)

  }

  putAcessoModulo(perfil: AcessosModulosRequest[], idUsuario: string){

    return this.http.put<AcessosModulosRequest>(`${this.acessosModuloUrl + environment.access + environment.acessoModulo}/alterar?idUsuario=${idUsuario}`
      , JSON.stringify(perfil)
      , this.httpOptions)
      .pipe(
        map(response => response['data'])
      );

  }

}
