import { Veiculo } from "../veiculos/veiculo.model";

export class Visitante{

  id: string;
  nome: string;
  rg: string;
  cpf: string;
  telefone: string;
  celular: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  dataCriacao: string;
  ultimaVisita: string;
  posicao: number;
  veiculos: Veiculo[];

}
