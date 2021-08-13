import { VeiculoVisita } from "../visita/veiculoVisita.model";

export interface VisitaRequest{

  cpf: string,
  rg: string,
  residenciaId: string,
  placa: string,
  veiculoVisita: VeiculoVisita

}
