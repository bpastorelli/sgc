import { Cep } from './cep.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class CepService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  };

  getCep(cep: string): Observable<Cep> {

    return this.http.get<any>(`${environment.apiUrlCep}/${cep}/json`, this.httpOptions)

  }

}
