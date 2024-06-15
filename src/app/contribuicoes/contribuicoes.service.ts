import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Contribuicao } from './contribuicao.model';
import { ContribuicoesFilterModel } from './contribuicoes-filter.model';
import { BaseService } from '../_services/base.service';
import { Params } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ContribuicoesService extends BaseService  {

  contribuicoes: Contribuicao[] = [];

  request: ContribuicoesFilterModel;

  constructor(private http: HttpClient) {
    super();
  }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getContribuicoes(request: ContribuicoesFilterModel): Observable<Contribuicao[]> {

    request = this.setCamposDefault(request);

    let queryParams: Params = {};
    if(request){
      queryParams = this.setParameter(request);
    }

    return this.http.get<Array<Contribuicao>>(environment.protocol + environment.apiUrl + environment.contribuicao + environment.filtro , {params: queryParams})
              .pipe(
                map(response => response));

  }

  getContribuicoesPorUsuario(moradorId: number): Observable<Contribuicao[]> {

    return this.http.get<Contribuicao[]>(`${environment.apiUrl}/associados/lancamento/filtroPorDatas?dataInicio=&dataFim=&moradorId=${moradorId}&pag=0&ord=dataPagamento&dir=DESC&qtdePorPagina=100000000`)

  }

  setCamposDefault(request: ContribuicoesFilterModel): ContribuicoesFilterModel{

    request.content == null ? request.content = true : request.content;
    request.posicao == 2 ? request.posicao = null : request.posicao;
    request.size == null ? request.size =  100000000 : request.size;
    request.sort == null ? request.sort = 'nome' : request.sort;
    request.page == null ? request.page = 0 : request.page;

    return request;

  }

}
