import { HttpErrorResponse } from '@angular/common/http';
import { browser } from 'protractor';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';

export class ErrorHandler{

    // Manipulação de erros
    static handleError(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Erro ocorreu no lado do client
        errorMessage = error.error.message;
      } else {
        // Erro ocorreu no lado do servidor
        errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    };

    static extracErrorMessage(error: any) : any {

      //Retorna mensagems vindas do servidor http.
      let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error._body}` : 'Server error';

        console.log(`Response error ${error}`)

        errMsg = error._body;
        //errMsg = errMsg.replace(/[\\"]/g,'');
        //errMsg = errMsg.replace("[", '');
        //errMsg = errMsg.replace("]", '');

        throw new Error(errMsg);
    }

    static processError(err) {
      let message = '';
      if(err.error instanceof ErrorEvent) {
       message = err.error.message;
      } else {
       message = `Error Code: ${err.status}\nMessage: ${err.message}`;
      }
      console.log(message);
      return throwError(message);
   }

}
