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
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public acessoModulo: Observable<AcessoModulo>;
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
                this.acessos(user.id, 4);
                return user;
            }));
    }

    acessos(idUsuario: number, idModulo: number) {
        return this.http.get<any>(`${environment.apiUrl}/access/acessoModulo/busca?idUsuario=${idUsuario}&idModulo=${idModulo}`)
          .subscribe(
            data=>{
              this.acessoModulo = data;
            }, err=>{
              console.log(err);
            }
          );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

}
