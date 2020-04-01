export interface UserToken {
  sub: string;
  papel: string[];
  setor?: string[];
  exp: number;
  nome: string;
  admin: boolean;
  usuario: boolean;
}
