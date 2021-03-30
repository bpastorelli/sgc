import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Morador } from './../morador/morador.model';
import { Residencias } from './../../residencias/residencias.model';

import { retry, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';


@Injectable({providedIn: 'root'})
export class MoradorService {


  constructor(private http: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  postMoradores(morador: Morador): Observable<Morador> {

    return this.http.post<Morador>(`${environment.apiUrl}/associados/morador/incluir`
        , JSON.stringify(morador),
        this.httpOptions)
        .pipe(
          retry(2),
          catchError(ErrorHandler.handleError)
        )

  }

  postMorador(morador: Morador): Observable<Morador> {

    return this.http.post<Morador>(`${environment.apiUrl}/associados/morador/novo`
        , JSON.stringify(morador)
        , this.httpOptions)
        .pipe(
          retry(2),
          catchError(ErrorHandler.handleError)
        )

  }

  putMorador(morador: Morador, id: string): Observable<Morador> {

    return this.http.put<Morador>(`${environment.apiUrl}/associados/morador/morador/${id}`
        , JSON.stringify(morador)
        , this.httpOptions)
        .pipe(
          retry(2),
          catchError(ErrorHandler.handleError)
        )
  }

  getMorador(id: string) : Observable<Morador>{

    return this.http.get<Morador>(`${environment.apiUrl}/associados/morador/id/${id}`)

  }

  getResidenciasVinculadas(moradorId: string): Observable<Residencias[]>{

    return this.http.get<Residencias[]>(`${environment.apiUrl}/associados/vinculo-residencia/residencias/morador/${moradorId}`)

  }

}
