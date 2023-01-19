import { ResidenciaResponse } from "src/app/residencias/residencia-response.model";

export class MoradorResponse {

    id: string;
    nome: string;
    cpf: string;
    rg: string;
    email: string;
    senha: string;
    perfil: string;
    telefone: string;
    celular: string;
    residenciaId: string;
    dataAtualizacao: Date;
    dataCriacao: Date;
    posicao: number;
    associado: number;
    residencias: ResidenciaResponse[];
    guide: string;

}
