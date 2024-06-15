import { Veiculo } from './veiculo.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';
import { Params } from '@angular/router';
import { BaseService } from '../_services/base.service';
import { VeiculoFilterModel } from './veiculo-filter.model';

@Injectable()
export class VeiculosService extends BaseService {

  request: VeiculoFilterModel;

  constructor(private http: HttpClient) {
    super();
  }

  getVeiculos(request: VeiculoFilterModel): Observable<Array<Veiculo>> {

    request = this.setCamposDefault(request);

    let queryParams: Params = {};
    if(request){
      queryParams = this.setParameter(request);
    }

    return this.http.get<Array<Veiculo>>(environment.protocol + environment.apiUrl + environment.veiculo + environment.filtro , {params: queryParams})
              .pipe(
                map(response => response));

  }

  postVeiculo(veiculo: Veiculo): Observable<Veiculo>{

    return this.http.post<Veiculo>(`${environment.apiUrl}/associados/veiculo/novo`
        , JSON.stringify(veiculo)
        , this.httpOptions)
        .pipe(
          map(response => response['data'])
        );

  }

  postVeiculoAmqp(veiculo: Veiculo): Observable<any>{

    return this.http.post<Veiculo>(`${environment.protocol + environment.apiUrl}/veiculo/amqp/novo`
        , JSON.stringify(veiculo)
        , this.httpOptions)
        .pipe(
          map(response => response)
        );

  }

  putVeiculo(veiculo: Veiculo, id: string): Observable<any>{

    return this.http.put<Veiculo>(`${environment.protocol + environment.apiUrl}/veiculo/amqp/alterar?id=${id}`
        , JSON.stringify(veiculo)
        , { headers: this.httpOptions.headers })
        .pipe(
          map(response => response)
      );

  }

  getVeiculoById(id: string): Observable<Veiculo[]>{

      return this.http.get<Veiculo[]>(`${environment.protocol + environment.apiUrl}/veiculo/filtro?id=${id}&content=true`);

  }

  getVeiculoByTicket(ticket: string): Observable<Veiculo[]>{

    return this.http.get<Veiculo[]>(`${environment.protocol + environment.apiUrl}/veiculo/filtro?guide=${ticket}&content=true`);

  }

  getVeiculoByPlaca(placa: string): Observable<Array<Veiculo>>{

      placa = placa.replace("-", "");
      return this.http.get<Array<Veiculo>>(`${environment.protocol + environment.apiUrl}/veiculo/filtro?placa=${placa}&content=true`);

  }

  getVeiculosByVisitanteId(id: string): Observable<Veiculo[]>{

    return this.http.get<Veiculo[]>(`${environment.protocol + environment.apiUrl}/associados/veiculo/vinculo/visitante/${id}`)

  }

  getVeiculosByVisitanteRg(rg: string): Observable<Veiculo[]>{

    return this.http.get<Veiculo[]>(`${environment.protocol + environment.apiUrl}/associados/veiculo/vinculo/visitante/rg/${rg}`)

  }

  setCamposDefault(request: VeiculoFilterModel): VeiculoFilterModel{

    request.content == null ? request.content = true : request.content;
    request.posicao == 2 ? request.posicao = null : request.posicao;
    request.size == null ? request.size =  1000000 : request.size;
    request.sort == null ? request.sort = 'modelo' : request.sort;
    request.page == null ? request.page = 0 : request.page;

    return request;

  }

}
