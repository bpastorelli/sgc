import { ResidenciaResponse } from './residencia-response.model';
import { BaseService } from 'src/app/_services/base.service';
import { ResidenciasFilterModel } from './residencias-filter.model';
import { Residencia } from './residencias.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Params } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class ResidenciasService extends BaseService {

  private residenciasUrl: string = environment.protocol + environment.apiUrl + environment.residenciaUrl + environment.filtro;

  constructor(private http: HttpClient){
    super();
  }

  residencias(request: ResidenciasFilterModel): Observable<Array<ResidenciaResponse>> {

    let queryParams: Params = {};
    if(request){
      queryParams = this.setParameter(request);
    }

    return this.http.get<Array<ResidenciaResponse>>(this.residenciasUrl, {params: queryParams})
      .pipe(
          map(response => response));

  }

}
