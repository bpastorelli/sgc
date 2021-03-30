import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Residencias } from './../residencias.model';
import { Moradores } from './../../moradores/moradores.model';
import { environment } from './../../../environments/environment.prod';

import { retry, catchError } from 'rxjs/operators';
import { ErrorHandler } from './../../app.error-handler';

@Injectable()
export class ResidenciaService {

  constructor(private http: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  postResidencia(residencias: Residencias): Observable<Residencias> {

    return this.http.post<Residencias>(`${environment.apiUrl}/associados/residencia`
        ,JSON.stringify(residencias)
        ,this.httpOptions)
        .pipe(
          retry(2),
          catchError(ErrorHandler.handleError)
        )

  }

  postNovaResidencia(residencia: Residencias): Observable<Residencias>{

    return this.http.post<Residencias>(`${environment.apiUrl}/associados/residencia/nova`
        ,JSON.stringify(residencia)
        ,this.httpOptions)
        .pipe(
          retry(2),
          catchError(ErrorHandler.handleError)
        )

  }

  putResidencia(residencia: Residencias, id: string): Observable<Residencias>{

    return this.http.put<Residencias>(`${environment.apiUrl}/associados/residencia/${id}`
        , JSON.stringify(residencia)
        , this.httpOptions)
        .pipe(
          retry(2),
          catchError(ErrorHandler.handleError)
        )

  }

  getMoradoresVinculados(residenciaId: string): Observable<Moradores[]>{

    return this.http.get<Moradores[]>(`${environment.apiUrl}/associados/vinculo-residencia/moradores/residencia/${residenciaId}`)

  }

}
