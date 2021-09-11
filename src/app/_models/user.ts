export class User {
  id: number;
  email: string;
  senha: string;
  nome: string;
  token?: string;
  primeiroAcesso: boolean;
}
