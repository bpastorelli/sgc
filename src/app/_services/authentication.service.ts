import { BaseService } from 'src/app/_services/base.service';
import { Password } from './../_models/password';
import { AcessoFuncionalidade } from './../_models/acessoFuncionalidade';
import { AcessoModulo } from './../_models/acessoModulo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { User } from './../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public acessoModulos: AcessoModulo[];
    public acessoFuncionalidades: AcessoFuncionalidade[];

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    // Headers
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      })
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {

        return this.http.post<any>(`${environment.protocol + environment.apiUrl + environment.token}`, { "email": username, "senha": password }, this.httpOptions)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user.token));
                localStorage.setItem('idUsuario', JSON.stringify(user.id))
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    alterarSenha(id: number, password: Password){
        return this.http.post<any>(`${environment.protocol + environment.apiUrl}/token/alterarSenha?id=${id}`
          , JSON.stringify(password)
          , this.httpOptions)
        .pipe(
          map(response => response['data'])
        );
    }

    acessosModulos(id: string, acesso: boolean) : Observable<AcessoModulo[]> {

      if(id.toString() != 'undefined'){
        return this.http.get<AcessoModulo[]>(`${environment.protocol + environment.apiUrl}/access/acessoModulo/filtro?idUsuario=${id}&acesso=${acesso}&content=true&size=100000&sort=nomeFuncionalidade&page=0&direction=DESC`)
      }
    }

    acessosFuncionalidades(id: string, idModulo: string, acesso: boolean) : Observable<AcessoFuncionalidade[]> {

      if(id.toString() != 'undefined' || idModulo.toString() != 'undefined'){
        return this.http.get<AcessoFuncionalidade[]>(`${environment.protocol + environment.apiUrl}/access/acessoFuncionalidade/filtro?id=${id}&idModulo=${idModulo}&acesso=${acesso}&pag=0&ord=id&dir=ASC&size=1000000`)
      }
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

}
