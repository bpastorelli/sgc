import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Moradores } from "./moradores.model";
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Injectable({ providedIn: 'root' })
export class MoradoresService {

  constructor(private http: HttpClient){}

  getMoradores(id: string, nome: string, cpf: string, rg: string, email: string): Observable<Moradores[]> {

    return this.http.get<Moradores[]>(`${environment.apiUrl}/associados/morador/filtro?id=${id}&cpf=${cpf}&rg=${rg}&email=${email}&nome=${nome}&pag=0&ord=nome&dir=ASC&size=1000000`)

  }
}
