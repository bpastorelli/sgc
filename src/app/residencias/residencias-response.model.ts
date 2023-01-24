import { MoradorResponse } from './../moradores/morador/morador-response.model';
export interface Residencia {

  id: number,
  endereco: string,
  numero: string,
  complemento: string,
  bairro: string,
  cep: string,
  cidade: string,
  uf: string,
  dataVinculo: string,
  moradores: MoradorResponse[];

}
