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
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {

        return this.http.post<any>(`${environment.apiUrl}/token`, { "email": username, "senha": password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user.token));
                localStorage.setItem('idUsuario', JSON.stringify(user.id))
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    alterarSenha(idUsuario: number, password: Password){
        return this.http.post<any>(`${environment.apiUrl}/token/alterarSenha?idUsuario=${idUsuario}`
          , JSON.stringify(password)
          , this.httpOptions)
        .pipe(
          map(response => response['data'])
        );
    }

    acessosModulos(idUsuario: string, acesso: boolean) : Observable<AcessoModulo[]> {

      if(idUsuario.toString() != 'undefined'){
        return this.http.get<AcessoModulo[]>(`${environment.apiUrl}/access/acessoModulo/buscaModulos?idUsuario=${idUsuario}&acesso=${acesso}`)
      }
    }

    acessosFuncionalidades(idUsuario: string, idModulo: string, acesso: boolean) : Observable<AcessoFuncionalidade[]> {

      if(idUsuario.toString() != 'undefined' || idModulo.toString() != 'undefined'){
        return this.http.get<AcessoFuncionalidade[]>(`${environment.apiUrl}/access/acessoFuncionalidade/filtro?idUsuario=${idUsuario}&idModulo=${idModulo}&acesso=${acesso}&pag=0&ord=id&dir=ASC&size=1000000`)
      }
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

}
