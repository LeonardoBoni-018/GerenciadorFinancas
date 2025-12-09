import { api } from "./api";

export async function cadastrar(nome: string, email: string, senha: string) {
  return api.post("/auth/register", { nome, email, senha });
}

export async function login(email: string, senha: string) {
  return api.post("/auth/login", { email, senha });
}
