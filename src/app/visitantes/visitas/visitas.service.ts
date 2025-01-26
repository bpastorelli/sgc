import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BaseService } from "src/app/_services/base.service";
import { environment } from "src/environments/environment";
import { VisitasFilterModel } from "./visitas-filter.model";
import { Visita } from "./visitas.model";
import { VisitasResponse } from "./visitas-response.model";

@Injectable()
export class VisitasService extends BaseService {

  request: VisitasFilterModel;

  constructor(private http: HttpClient) {
    super();
  }

  getVisitas(request: VisitasFilterModel): Observable<VisitasResponse> {

    request = this.setCamposDefault(request);

    let queryParams: Params = {};
    if(request){
      queryParams = this.setParameter(request);
    }

    return this.http.get<VisitasResponse>(environment.protocol + environment.urlCloud + environment.urlVisitaMs + environment.visita + environment.filtro , {params: queryParams})
              .pipe(
                map(response => response));

  }

  baixarVisita(id: string): Observable<any>{

    return this.http.put<Visita>(`${environment.protocol + environment.urlCloud + environment.urlVisitaMs + environment.visita + environment.amqp }/encerrar`
        , `{ "id": "${id}" }`
        , this.httpOptions)
        .pipe(
          map(response => response['data'])
        );

  }

  setCamposDefault(request: VisitasFilterModel): VisitasFilterModel{

    request.content == null ? request.content = false : request.content;
    request.posicao == 2 ? request.posicao = null : request.posicao;
    request.size == null ? request.size =  20 : request.size;
    request.page == null ? request.page = 1 : request.page;

    return request;

  }


}
