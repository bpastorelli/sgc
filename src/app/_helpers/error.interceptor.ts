import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AuthenticationService } from './../_services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req)
          .catch(errorResponse => {
              let errMsg: string;

              if (errorResponse.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
              }

              if (errorResponse instanceof HttpErrorResponse) {
                  const err = errorResponse.message || JSON.stringify(errorResponse.error);
                  errMsg = `${errorResponse.error || ''}`;
              } else {
                  errMsg = errorResponse.message ? errorResponse.message : errorResponse.toString();
              }
              return throwError(errMsg);
          });
    }
}
