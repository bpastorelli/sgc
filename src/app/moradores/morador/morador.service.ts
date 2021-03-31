import { ErrorHandler } from 'src/app/app.error-handler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Morador } from './../morador/morador.model';
import { Residencias } from './../../residencias/residencias.model';

import { catchError, map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class MoradorService {

constructor(private http: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  postMoradores(morador: Morador): Observable<Morador> {

    return this.http.post<Morador>(`${environment.apiUrl}/associados/morador/incluir`
        , JSON.stringify(morador)
        , this.httpOptions)
        .pipe(
          map(response => response['data'])
        );

  }

  postMorador(morador: Morador): Observable<Morador> {

    return this.http.post<Morador>(`${environment.apiUrl}/associados/morador/novo`
        , JSON.stringify(morador)
        , this.httpOptions)
        .pipe(
          map(response => response['data']),
          catchError(ErrorHandler.extracErrorMessage)
        );

  }

  putMorador(morador: Morador, id: string): Observable<any> {

    return this.http.put<Morador>(`${environment.apiUrl}/associados/morador/morador/${id}`
        , JSON.stringify(morador)
        , this.httpOptions)
        .pipe(
          map(response => response['data'])
        );
  }

  getMorador(id: string) : Observable<Morador>{

    return this.http.get<Morador>(`${environment.apiUrl}/associados/morador/id/${id}`)

  }

  getResidenciasVinculadas(moradorId: string): Observable<Residencias[]>{

    return this.http.get<Residencias[]>(`${environment.apiUrl}/associados/vinculo-residencia/residencias/morador/${moradorId}`)

  }

}
