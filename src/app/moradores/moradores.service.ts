import { Injectable } from '@angular/core';
import { Moradores } from "./moradores.model";
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { Morador } from './morador/morador.model';

@Injectable({ providedIn: 'root' })
export class MoradoresService {

  constructor(private http: HttpClient){}

  getMoradores(id: string, nome: string, cpf: string, rg: string, email: string): Observable<Moradores[]> {

    return this.http.get<Moradores[]>(`${environment.apiUrl}/associados/morador/filtro?id=${id}&cpf=${cpf}&rg=${rg}&email=${email}&nome=${nome}&pag=0&ord=nome&dir=ASC&size=1000000`)

  }

  getMoradoresByPosicao(posicao: number){

    return this.http.get<Moradores[]>(`${environment.apiUrl}/associados/morador/filtroPorPosicao?posicao=${posicao}&pag=0&size=1000000&ord=nome&dir=ASC`)

  }

}
