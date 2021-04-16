import { Veiculo } from './veiculo.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class VeiculosService {

  constructor(private http: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getVeiculos(placa: string, marca: string, modelo: string, ano: number): Observable<Veiculo[]> {

    return this.http.get<Veiculo[]>(`${environment.apiUrl}/associados/veiculo/filtro?placa=${placa}&marca=${marca}&modelo=${modelo}&ano=${ano}&pag=0&ord=marca&dir=ASC&size=1000000`)

  }

  postVeiculo(veiculo: Veiculo): Observable<any>{

    console.log(veiculo);

    return this.http.post<Veiculo>(`${environment.apiUrl}/associados/veiculo/novo`
        , JSON.stringify(veiculo)
        , this.httpOptions)
        .pipe(
          map(response => response['data'])
        );

  }

  putVeiculo(veiculo: Veiculo, id: string): Observable<any>{

    console.log(veiculo);

    return this.http.put<Veiculo>(`${environment.apiUrl}/associados/veiculo/veiculo/${id}`
        , JSON.stringify(veiculo)
        , this.httpOptions)
        .pipe(
          map(response => response['data'])
      );

  }

  getVeiculoById(id: string): Observable<Veiculo[]>{

      return this.http.get<Veiculo[]>(`${environment.apiUrl}/associados/veiculo/id/${id}`);

  }

  getVeiculoByPlaca(placa: string): Observable<Veiculo>{

    return this.http.get<Veiculo>(`${environment.apiUrl}/associados/veiculo/placa/${placa}`);

  }

  getVeiculosByVisitanteId(id: string): Observable<Veiculo[]>{

    return this.http.get<Veiculo[]>(`${environment.apiUrl}/associados/veiculo/vinculo/visitante/${id}`)

  }

  getVeiculosByVisitanteRg(rg: string): Observable<Veiculo[]>{

    return this.http.get<Veiculo[]>(`${environment.apiUrl}/associados/veiculo/vinculo/visitante/rg/${rg}`)

  }

}
