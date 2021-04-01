import { Residencias } from './residencias.model';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ResidenciasService {

  constructor(private http: HttpClient){}

  residencias(id: string, matricula: string, endereco: string, numero: string): Observable<Residencias[]> {

    return this.http.get<Residencias[]>(`${environment.apiUrl}/associados/residencia/filtro?id=${id}&matricula=${matricula}&endereco=${endereco}&numero=${numero}&pag=0&ord=id&dir=ASC&size=1000000`)

  }

}
