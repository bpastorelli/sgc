import { Contribuicao } from './../contribuicao.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImportarContribuicoesService {

  contribuicoes: Contribuicao[] = [];

  constructor(private http: HttpClient){}

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  postImportacao(formData: FormData): Observable<any>{

    return this.http.post<any>(`${environment.apiUrl}/associados/lancamento/import`, formData)
      .pipe(map(data => {
          this.contribuicoes = data;
          return this.contribuicoes;
      }));

  }

}
