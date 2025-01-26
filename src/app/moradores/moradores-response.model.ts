import { Paginacao } from "src/app/_models/paginacao";
import { Moradores } from "./moradores.model";

export interface MoradoresResponse{

    moradores: Moradores[],
    
    paginacao: Paginacao

}