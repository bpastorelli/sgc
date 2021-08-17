import { Modulo } from './modulo.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ModulosService {

  constructor(private http: HttpClient){}

  getModulos(id: number, descricao: string): Observable<Modulo[]> {

    return this.http.get<Modulo[]>(`${environment.apiUrl}/access/modulo/filtro?filtro?id=${id}&descricao=${descricao}&pag=0&ord=descricao&dir=ASC&size=1000000`)

  }

}
