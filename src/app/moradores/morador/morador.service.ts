import { MoradoresFilterModel } from './../moradores-filter.model';
import { ResidenciaResponse } from './../../residencias/residencia-response.model';
import { MoradorResponse } from './morador-response.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Morador } from './../morador/morador.model';
import { Residencia } from './../../residencias/residencias.model';

import { map } from 'rxjs/operators';
import { Params } from '@angular/router';
import { BaseService } from 'src/app/_services/base.service';

@Injectable({providedIn: 'root'})
export class MoradorService extends BaseService {

private moradorUrl = environment.protocol + environment.apiUrl + environment.moradorUrl;

constructor(private http: HttpClient) {
  super();
 }

  postMoradores(request: Morador): Observable<Morador> {

    let queryParams: Params = {};
    if(request){
      queryParams = this.setParameter(request);
    }

    return this.http.post<Morador>(`${environment.apiUrl}/associados/morador/incluir`
        , JSON.stringify(request)
        , this.httpOptions)
        .pipe(
          map(response => response['data'])
        );

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

    return this.http.get<Morador>(`${environment.apiUrl}/associados/morador/amqp/ticket?ticket=${ticket}`);
  }

  putMorador(request: Morador, id: number): Observable<any> {

    let queryParams: Params = {};
    if(request){
      queryParams = this.setParameter(request);
    }

    return this.http.put<Morador>(`${this.moradorUrl + environment.alterar}?id=${id}`
        , JSON.stringify(request)
        , { headers: this.httpOptions.headers } )
        .pipe(
          map(response => response)
        );
  }

  //Revisão Ok.
  getMorador(id: string) : Observable<Array<MoradorResponse>>{

    return this.http.get<Array<MoradorResponse>>(`${this.moradorUrl}/filtro?id=${id}&size=1&page=0&content=true`
        , this.httpOptions)
        .pipe(
          map(response => response)
        );
  }

  getResidenciasVinculadas(moradorId: string): Observable<ResidenciaResponse[]>{

    return this.http.get<ResidenciaResponse[]>(`${environment.apiUrl}/associados/vinculo-residencia/residencias/morador/${moradorId}`)

  }

}
