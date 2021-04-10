import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Visita } from './visitas/visitas.model';
import { Visitante } from './visitante.model';
import { VisitaRequest } from './visita/visitaRequest.model';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class VisitantesService {

  constructor(private http: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getVisitantes(id: string, nome: string, rg: string, cpf: string): Observable<Visitante[]> {

    return this.http.get<Visitante[]>(`${environment.apiUrl}/associados/visitante/filtro?id=${id}&nome=${nome}&rg=${rg}&cpf=${cpf}&pag=0&ord=nome&dir=ASC&size=1000000`)

  }

  getVisitante(rg: string, cpf: string): Observable<Visitante> {

    return this.http.get<Visitante>(`${environment.apiUrl}/associados/visitante/busca?rg=${rg}&cpf=${cpf}`)

  }

  getVisitas(nome: string, rg: string, cpf: string, posicao: number, ord: string, dir: string): Observable<Visita[]> {

    return this.http.get<Visita[]>(`${environment.apiUrl}/associados/visita/filtro?nome=${nome}&rg=${rg}&cpf=${cpf}&posicao=${posicao}&pag=0&ord=${ord}&dir=${dir}&size=1000000`)

  }

  postVisitante(visitante: Visitante): Observable<any>{

    return this.http.post<Visitante>(`${environment.apiUrl}/associados/visitante/incluir`
        , JSON.stringify(visitante)
        , this.httpOptions)
        .pipe(
          map(response => response['data'])
        );

  }

  putVisitante(visitante: Visitante, id: string): Observable<any>{

    return this.http.put<Visitante>(`${environment.apiUrl}/associados/visitante/${id}`
        , JSON.stringify(visitante)
        , this.httpOptions)
        .pipe(
          map(response => response['data'])
        );

  }

  baixarVisita(id: string): Observable<any>{

    return this.http.put<Visita>(`${environment.apiUrl}/associados/visita/encerrar`
        , `{ "id": "${id}" }`
        , this.httpOptions)
        .pipe(
          map(response => response['data'])
        );

  }

  postVisita<Visita>(visitaRequest: VisitaRequest): Observable<any>{

    return this.http.post<Visita>(`${environment.apiUrl}/associados/visita/incluir`
        , JSON.stringify(visitaRequest)
        , this.httpOptions)
        .pipe(
          map(response => response['data'])
        );
    }

  }
