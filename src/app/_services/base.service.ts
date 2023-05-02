import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Params } from "@angular/router";


export abstract class BaseService{

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    })
  }

  protected addHeader(name: string, value: string ){

    this.httpOptions.headers.append(name, value);

  }

  protected path(path: string): string{
    return `${environment.protocol + window.location.host + '/'}${path}`;
  }

  protected setParameter(routerParams: Params): HttpParams{

    let queryParams = new HttpParams();
    for(const key in routerParams){
      if(routerParams.hasOwnProperty(key)){
        queryParams = queryParams.set(key, routerParams[key]);
      }
    }

    return queryParams;

  }

}
