import { browser } from 'protractor';
import { Observable } from 'rxjs';

export class ErrorHandler{
    static handleError(error: Response | any){

      let errorMessage: string

      if(error instanceof Response){
        errorMessage = `Erro ${error.status} ao acessar a URL ${error.url} - ${error.statusText}`
      }else{
        errorMessage = error.toString()
      }
      console.log(errorMessage)
      return Observable.throw(error.status)
    }

    static extracErrorMessage(error: any) : any {

      //Retorna mensagems vindas do servidor http.
      let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error._body}` : 'Server error';

        errMsg = error._body;
        errMsg = errMsg.replace(/[\\"]/g,'');
        errMsg = errMsg.replace("[", '');
        errMsg = errMsg.replace("]", '');

        throw new Error(errMsg);
    }

}
