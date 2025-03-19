import { MoradoresFilterModel } from './moradores-filter.model';
import { Injectable } from '@angular/core';
import { Moradores } from "./moradores.model";
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { Morador } from './morador/morador.model';
import { Params } from '@angular/router';
import { BaseService } from '../_services/base.service';
import { map } from 'rxjs/operators';
import { MoradorResponse } from './morador/morador-response.model';
import { MoradoresResponse } from './moradores-response.model';

@Injectable({ providedIn: 'root' })
export class MoradoresService extends BaseService {

  private moradoresUrl: string = environment.protocol + environment.urlCloud + environment.urlMoradorMs + environment.filtro;

  constructor(private http: HttpClient){
    super();
  }

  getMoradores(request: MoradoresFilterModel): Observable<MoradoresResponse> {

    request = this.setCamposDefault(request);

    let queryParams: Params = {};
    if(request){
      queryParams = this.setParameter(request);
    }

    return this.http.get<MoradoresResponse>(this.moradoresUrl, {params: queryParams})
    .pipe(
        map(response => response));

  }

  setCamposDefault(request: MoradoresFilterModel): MoradoresFilterModel{

    request.content == null ? request.content = false : request.content;
    request.size == null ? request.size =  20 : request.size;
    request.page == null ? request.page = 1 : request.page;

    return request;

  }

}
