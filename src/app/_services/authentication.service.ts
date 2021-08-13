import { AcessoModulo } from './../_models/acessoModulo';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { User } from './../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private acesso: boolean;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public acessoModulos: AcessoModulo[];
    private router: Router;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/token`, { "email": username, "senha": password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user.token));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    acessos(idUsuario: number, acesso: boolean) : Observable<AcessoModulo[]> {
        return this.http.get<AcessoModulo[]>(`${environment.apiUrl}/access/acessoModulo/buscaModulos?idUsuario=${idUsuario}&acesso=${acesso}`)
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

}
