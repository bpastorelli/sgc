import { Modulo } from './modulo.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';

@Injectable()
export class ModulosService {

  constructor(private http: HttpClient){}

    // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getModulos(id: number, descricao: string, path: string): Observable<Modulo[]> {

    return this.http.get<Modulo[]>(`${environment.apiUrl}/access/modulo/filtro?id=${id}&descricao=${descricao}&path=${path}&pag=0&ord=descricao&dir=ASC&size=1000000`)

  }

  putModulo(modulo: Modulo, id: number){

    return this.http.put<Modulo>(`${environment.apiUrl}/access/modulo/idModulo/${id}`
      , JSON.stringify(modulo)
      , this.httpOptions)
      .pipe(
        map(response => response['data'])
      );

  }

  postModulo(modulo: Modulo){

    return this.http.post<Modulo>(`${environment.apiUrl}/access/modulo/incluir`
      , JSON.stringify(modulo)
      , this.httpOptions)
      .pipe(
        map(response => response['data'])
      );

  }

}
