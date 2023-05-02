import { Visitante } from "../visitantes/visitante.model";

export interface Veiculo{

  id: string,
  placa: string,
  marca: string,
  modelo: string,
  cor: string,
  ano: string,
  posicao: string,
  guide: string,
  visitantes: Visitante[]

}
