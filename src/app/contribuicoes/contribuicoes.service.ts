import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Contribuicao } from './contribuicao.model';

@Injectable({ providedIn: 'root' })
export class ContribuicoesService {

  contribuicoes: Contribuicao[] = [];

  constructor(private http: HttpClient){}

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getContribuicoes(dataInicio: Date, dataFim: Date, moradorId: number): Observable<Contribuicao[]> {

    return this.http.get<Contribuicao[]>(`${environment.apiUrl}/associados/lancamento/filtroPorDatas?dataInicio=${dataInicio}&dataFim=${dataFim}&moradorId=${moradorId}&pag=0&ord=dataPagamento&dir=DESC&qtdePorPagina=1000000`)

  }

  getContribuicoesPorUsuario(moradorId: number): Observable<Contribuicao[]> {

    return this.http.get<Contribuicao[]>(`${environment.apiUrl}/associados/lancamento/filtroPorDatas?dataInicio=&dataFim=&moradorId=${moradorId}&pag=0&ord=dataPagamento&dir=DESC&qtdePorPagina=1000000`)

  }

}
