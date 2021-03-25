import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment.prod';
import { User } from './../_models/user';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {

        return this.http.get<User[]>(`${environment.apiUrl}/associados/morador/filtro?id=&cpf=&rg=&email=&nome=&pag=0&ord=nome&dir=ASC&size=1000000`)
    }
}
