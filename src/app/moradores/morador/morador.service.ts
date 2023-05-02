import { Params } from '@angular/router';
import { MoradoresFilterModel } from './../moradores-filter.model';
import { ResidenciaResponse } from './../../residencias/residencia-response.model';
import { MoradorResponse } from './morador-response.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Morador } from './../morador/morador.model';

import { map } from 'rxjs/operators';
import { BaseService } from 'src/app/_services/base.service';

@Injectable({providedIn: 'root'})
export class MoradorService extends BaseService {

moradorRequest: MoradoresFilterModel;

private moradorUrl = environment.protocol + environment.apiUrl + environment.moradorUrl;

  constructor(private http: HttpClient) {
    super();
  }

  postMorador(morador: Morador): Observable<any> {

    return this.http.post<Morador>(`${environment.apiUrl}/associados/morador/novo`
        , JSON.stringify(morador)
        , this.httpOptions)
        .pipe(
          map(response => response['data']),
        );

  }

  postMoradorAmqp(morador: Morador): Observable<any> {

    return this.http.post<Morador>(this.moradorUrl + environment.novo
        , JSON.stringify(morador)
        , { headers: this.httpOptions.headers })
        .pipe(
          map(response => response),
        );
  }

  getTicketMorador(ticket: string): Observable<any>{

    this.moradorRequest = new MoradoresFilterModel();
    this.moradorRequest  = this.setCamposDefault(this.moradorRequest);

    if(ticket)
      this.moradorRequest.ticket = ticket;

    return this.getMoradores(this.moradorRequest);

  }

  getMoradores(requestFilter: MoradoresFilterModel) : Observable<Array<MoradorResponse>> {

    requestFilter = this.setCamposDefault(requestFilter);

    let queryParams: Params = {};
    if(requestFilter){
        queryParams = this.setParameter(this.moradorRequest);
    }

    return this.http.get<Array<MoradorResponse>>(this.moradorUrl + environment.filtro, {params: queryParams})
        .pipe(
          map(response => response)
        );

  }

  putMorador(request: Morador, id: string): Observable<any> {

    return this.http.put<Morador>(this.moradorUrl + environment.alterar + `?id=${id}`
        , JSON.stringify(request)
        , { headers: this.httpOptions.headers })
        .pipe(
          map(response => response)
        );
  }

  //Revisão Ok.
  getMorador(id: string) : Observable<Array<MoradorResponse>>{

    this.moradorRequest = new MoradoresFilterModel();
    this.moradorRequest  = this.setCamposDefault(this.moradorRequest);

    if(id)
      this.moradorRequest.id = id;

    return this.getMoradores(this.moradorRequest);
  }

  getResidenciasVinculadas(moradorId: string): Observable<ResidenciaResponse[]>{

    return this.http.get<ResidenciaResponse[]>(`${environment.apiUrl}/associados/vinculo-residencia/residencias/morador/${moradorId}`)

  }

  setCamposDefault(request: MoradoresFilterModel): MoradoresFilterModel{

    request.content == null ? request.content = true : request.content;
    request.posicao == null ? request.posicao = 1 : request.posicao;
    request.size == null ? request.size =  1000000 : request.size;
    request.sort == null ? request.sort = 'nome' : request.sort;
    request.page == null ? request.page = 0 : request.page;

    return request;

  }

}
