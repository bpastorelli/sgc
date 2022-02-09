import { VinculoResidencia } from './vincular-morador.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable()
export class VincularMoradorService{

  constructor(private http: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  postVinculo(vinculo: VinculoResidencia): Observable<any>{

    return this.http.post<VinculoResidencia>(`${environment.apiUrl}/associados/vinculo-residencia/amqp/vincular`
        , JSON.stringify(vinculo)
        , this.httpOptions)
        .pipe(
          map(response => response['data'])
        );

  }

}
