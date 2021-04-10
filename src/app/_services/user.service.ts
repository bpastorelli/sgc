import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { User } from './../_models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {

        //return this.http.get<User[]>(`${environment.apiUrl}/associados/morador/filtro?id=&cpf=&rg=&email=&nome=&pag=0&ord=nome&dir=ASC&size=1000000`)
    }
}
