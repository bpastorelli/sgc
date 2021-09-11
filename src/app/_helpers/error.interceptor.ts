import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AuthenticationService } from './../_services/authentication.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    error;

    constructor(private authenticationService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      return next.handle(req)
          .pipe(catchError(err => {

              if(err.status === 401) {
                // auto logout if 401 response returned from api
                this.error = err.error.message || err.statusText;
                this.authenticationService.logout();
                //location.reload(true);
              }
              else
                this.error = err.error || err.statusText;

              return throwError(this.error);
          }));
    }
}
