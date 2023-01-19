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

@Injectable({ providedIn: 'root' })
export class MoradoresService extends BaseService {

  private moradoresUrl: string = environment.protocol + environment.apiUrl + environment.moradorUrl + environment.filtro;

  constructor(private http: HttpClient){
    super();
  }

  getMoradores(request: MoradoresFilterModel): Observable<Array<Moradores>> {

    let queryParams: Params = {};
    if(request){
      queryParams = this.setParameter(request);
    }

    return this.http.get<Array<Moradores>>(this.moradoresUrl, {params: queryParams})
    .pipe(
        map(response => response));

  }

}
