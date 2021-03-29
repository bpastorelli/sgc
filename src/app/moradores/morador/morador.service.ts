import { environment } from './../../../environments/environment.prod';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Morador } from './../morador/morador.model';
//import { Residencia } from './../../residencias/residencia.model';

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

  //getResidenciasVinculadas(moradorId: string): Observable<Residencia[]>{

    //return this.http.get<Residencia[]>(`${_API}/associados/vinculo-residencia/residencias/morador/${moradorId}`)
    //    .catch(ErrorHandler.extracErrorMessage)

  //}

}
