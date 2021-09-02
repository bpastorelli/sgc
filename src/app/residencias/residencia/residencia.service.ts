import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Residencia } from './../residencias.model';
import { Moradores } from './../../moradores/moradores.model';
import { environment } from './../../../environments/environment';

import { map } from 'rxjs/operators';

@Injectable()
export class ResidenciaService {

  constructor(private http: HttpClient) { }

  errorMsg: string;

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  postResidencia(residencias: Residencia): Observable<Residencia> {

    return this.http.post<Residencia>(`${environment.apiUrl}/associados/residencia`
        ,JSON.stringify(residencias)
        ,this.httpOptions)

  }

  postNovaResidencia(residencia: Residencia): Observable<Residencia>{

    return this.http.post<Residencia>(`${environment.apiUrl}/associados/residencia/nova`
        ,JSON.stringify(residencia)
        ,this.httpOptions)

  }

  putResidencia(residencia: Residencia, id: string): Observable<any>{

    return this.http.put<Residencia>(`${environment.apiUrl}/associados/residencia/${id}`
        , JSON.stringify(residencia)
        , this.httpOptions)
        .pipe(
          map(response => response['data'])
        );
  }

  getMoradoresVinculados(residenciaId: string): Observable<Moradores[]>{

    return this.http.get<Moradores[]>(`${environment.apiUrl}/associados/vinculo-residencia/moradores/residencia/${residenciaId}`)

  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }

    }
}

}
