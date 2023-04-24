import { BaseService } from 'src/app/_services/base.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Visita } from './visitas/visitas.model';
import { Visitante } from './visitante.model';
import { VisitaRequest } from './visita/visitaRequest.model';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';
import { VisitasFilterModel } from './visitas/visitas-filter.model';
import { Params } from '@angular/router';
import { VisitanteFilterModel } from './visitante/visitante-filter.model';

@Injectable()
export class VisitantesService extends BaseService {

  request: VisitanteFilterModel;

  constructor(private http: HttpClient) {
    super();
  }

  stringJson: string;

  getVisitantes(request: VisitanteFilterModel ): Observable<Array<Visitante>> {

    request = this.setCamposDefault(request);

    let queryParams: Params = {};
    if(request){
      queryParams = this.setParameter(request);
    }

    return this.http.get<Array<Visitante>>(environment.protocol + environment.apiUrl + environment.visitante + environment.filtro, {params: queryParams})
          .pipe(
            map(response => response));

  }

  postVisitante(visitante: Visitante): Observable<any>{

    return this.http.post<Visitante>(`${environment.apiUrl}/associados/visitante/incluir`
        , JSON.stringify(visitante)
        , this.httpOptions)
        .pipe(
          map(response => response['data'])
        );

  }

  postVisitanteAmqp(visitante: Visitante): Observable<any>{

    return this.http.post<Visitante>(`${environment.apiUrl}/associados/visitante/amqp/incluir`
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

  postVisita<Visita>(visitaRequest: VisitaRequest): Observable<any>{

    return this.http.post<Visita>(`${environment.apiUrl}/associados/visita/incluir`
        , JSON.stringify(visitaRequest)
        , this.httpOptions)
        .pipe(
          map(response => response['data'])
        );
  }

  postVisitaAmqp<Visita>(visitaRequest: VisitaRequest): Observable<any>{

    return this.http.post<Visita>(`${environment.apiUrl}/associados/visita/amqp/incluir`
        , JSON.stringify(visitaRequest)
        , this.httpOptions)
        .pipe(
          map(response => response['data'])
        );
  }

  setCamposDefault(request: VisitanteFilterModel): VisitanteFilterModel{

    request.content == null ? request.content = true : request.content;
    request.posicao == null ? request.posicao = 1 : request.posicao;
    request.size == null ? request.size =  1000000 : request.size;
    request.sort == null ? request.sort = 'nome' : request.sort;
    request.page == null ? request.page = 0 : request.page;

    return request;

  }

}
