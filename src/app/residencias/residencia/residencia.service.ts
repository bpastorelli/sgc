import { BaseService } from 'src/app/_services/base.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Residencia } from './../residencias.model';
import { Moradores } from './../../moradores/moradores.model';
import { environment } from './../../../environments/environment';

import { map } from 'rxjs/operators';

@Injectable()
export class ResidenciaService extends BaseService {

  private residenciaUrl = environment.protocol + environment.apiUrl + environment.residenciaUrl;

  constructor(private http: HttpClient) {
    super();
  }

  postNovaResidencia(residencia: Residencia): Observable<Residencia>{

    return this.http.post<Residencia>(this.residenciaUrl + environment.nova
      , JSON.stringify(residencia)
      , { headers: this.httpOptions.headers })
      .pipe(
        map(response => response),
      );

  }

  postNovaResidenciaAmqp(residencia: Residencia): Observable<any>{

    return this.http.post<Residencia>(this.residenciaUrl + environment.nova
      , JSON.stringify(residencia)
      , { headers: this.httpOptions.headers })
      .pipe(
        map(response => response),
      );

  }

  putResidencia(request: Residencia, id: string): Observable<any>{

    return this.http.put<Residencia>(`${this.residenciaUrl + environment.alterar}?id=${id}`
        , JSON.stringify(request)
        , { headers: this.httpOptions.headers } )
        .pipe(
          map(response => response)
        );
  }


}
