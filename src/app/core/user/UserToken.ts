export interface UserToken {
  sub: string;
  papel: string[];
  setor?: string[];
  exp: number;
}
