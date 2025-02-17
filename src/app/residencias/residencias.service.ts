import { BaseService } from 'src/app/_services/base.service';
import { ResidenciasFilterModel } from './residencias-filter.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Params } from '@angular/router';
import { map } from 'rxjs/operators';
import { ResidenciasPaginadoResponse } from './residencias-paginado-response.model';

@Injectable()
export class ResidenciasService extends BaseService {

  private residenciasUrl: string = environment.protocol + environment.urlCloud + environment.urlResidenciaMs + environment.residenciaUrl + environment.filtro;

  constructor(private http: HttpClient){
    super();
  }

  residencias(request: ResidenciasFilterModel): Observable<ResidenciasPaginadoResponse> {

    let queryParams: Params = {};

    this.setCamposDefault(request);

    if(request){
      queryParams = this.setParameter(request);
    }

    return this.http.get<ResidenciasPaginadoResponse>(this.residenciasUrl, {params: queryParams})
      .pipe(
          map(response => response));

  }

  setCamposDefault(request: ResidenciasFilterModel): ResidenciasFilterModel{
  
    request.content == null ? request.content = false : request.content;
    request.size == null ? request.size =  20 : request.size;
    request.page == null ? request.page = 1 : request.page;

    return request;

  }

}
