import { BaseService } from 'src/app/_services/base.service';
import { ModulosFilterModel } from './modulos-filter.model';
import { Modulo } from './modulo.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { Params } from '@angular/router';

@Injectable()
export class ModulosService extends BaseService {

  constructor(private http: HttpClient){
    super();
  }

  getModulos(request: ModulosFilterModel): Observable<Array<Modulo>> {

    let queryParams: Params = {};
    if(request){
      queryParams = this.setParameter(request);
    }

    return this.http.get<Array<Modulo>>(environment.protocol + environment.apiUrl + environment.access + environment.modulo + environment.filtro, {params: queryParams})
      .pipe(
          map(response => response));

  }

  putModulo(modulo: Modulo, id: number){

    return this.http.put<Modulo>(`${environment.protocol + environment.apiUrl + environment.access + environment.modulo}/alterar?id=${id}`
      , JSON.stringify(modulo)
      , this.httpOptions)
      .pipe(
        map(response => response['data'])
      );

  }

  postModulo(modulo: Modulo){

    let modulos: Modulo[] = [];
    modulos.push(modulo);

    return this.postModulos(modulos);

  }

  postModulos(modulos: Modulo[]){

    return this.http.post<Modulo[]>(`${environment.protocol + environment.apiUrl + environment.access}/modulo/incluirEmMassa`
      , JSON.stringify(modulos)
      , this.httpOptions)
      .pipe(
        map(response => response['data'])
      );

  }

}
