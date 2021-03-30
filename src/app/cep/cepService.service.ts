import { environment } from './../../environments/environment';
import { Cep } from './cep.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class CepService {

  constructor(private http: HttpClient) { }

  getCep(cep: string): Observable<Cep> {

    return this.http.get<Cep>(`${environment.apiUrlCep}/${cep}/json`)

  }

}
