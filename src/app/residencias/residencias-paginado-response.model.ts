import { Paginacao } from "src/app/_models/paginacao";
import { Residencia } from "./residencias.model";

export class ResidenciasPaginadoResponse{

    residencias: Residencia[] = [],
    
    paginacao: Paginacao

}
