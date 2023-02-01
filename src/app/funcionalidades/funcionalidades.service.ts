import { BaseService } from 'src/app/_services/base.service';
import { FuncionalidadeRequest } from './funcionalidadeRequest.model';
import { Funcionalidade } from './funcionalidade.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { Params } from '@angular/router';
import { FuncionalidadeFilter } from './funcionalidade-filter.model';

@Injectable()
export class FuncionalidadeService extends BaseService {

  constructor(private http: HttpClient){
    super();
  }

  getFuncionalidades(request: FuncionalidadeFilter): Observable<Array<Funcionalidade>> {

    let queryParams: Params = {};
    if(request){
      queryParams = this.setParameter(request);
    }

    return this.http.get<Array<Funcionalidade>>(environment.protocol + environment.apiUrl + environment.access + environment.funcionalidade + environment.filtro, {params: queryParams})
      .pipe(
          map(response => response));

  }

  putFuncionaliade(id: number, funcionalidade: FuncionalidadeRequest){

    return this.http.put<Funcionalidade>(`${environment.protocol + environment.apiUrl}/access/funcionalidade/alterar?id=${id}`
      , JSON.stringify(funcionalidade)
      , this.httpOptions)
      .pipe(
        map(response => response['data'])
      );

  }

  postFuncionalidade(funcionalidade: FuncionalidadeRequest){

    return this.http.post<Funcionalidade>(`${environment.protocol + environment.apiUrl}/access/funcionalidade/incluir`
      , JSON.stringify(funcionalidade)
      , this.httpOptions)
      .pipe(
        map(response => response['data'])
      );

  }

}
