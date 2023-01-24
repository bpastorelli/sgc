import { AcessoFuncionalidadeFilter } from './acesso-funcionalidade-filter.model';
import { BaseService } from 'src/app/_services/base.service';
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
import { Params } from '@angular/router';

@Injectable()
export class AcessoFuncionalidadeService extends BaseService {

  private acessoFuncionalideUrl: string = environment.protocol + environment.apiUrl + environment.access + environment.perfil + environment.funcionalidade + environment.filtro;

  constructor(private http: HttpClient){
    super();
  }

  getAcessosFuncionalidade(request: AcessoFuncionalidadeFilter): Observable<Array<PerfilFuncionalidade>> {

    let queryParams: Params = {};
    if(request){
      queryParams = this.setParameter(request);
    }

    return this.http.get<Array<PerfilFuncionalidade>>(this.acessoFuncionalideUrl, {params: queryParams})
      .pipe(
        map(response => response));

  }

  putAcessoFuncionalidade(perfil: PerfilFuncionalidadeRequest[], idUsuario: string){

    return this.http.put<PerfilFuncionalidade>(`${environment.protocol + environment.apiUrl + environment.access + environment.acessoFuncionalidade }/alterar?idUsuario=${idUsuario}`
      , JSON.stringify(perfil)
      , this.httpOptions)
      .pipe(
        map(response => response['data'])
      );

  }

}
