import { api } from "./api";

export async function cadastrar(
  nome: string,
  email: string,
  telefone: string,
  cidade: string,
  senha: string
) {
  return api.post("/auth/register", { nome, email, telefone, cidade, senha });
}

export async function login(email: string, senha: string) {
  return api.post("/auth/login", { email, senha });
}

export async function updateProfile(
  id: number,
  nome: string,
  email: string,
  telefone: string,
  cidade: string
) {
  return api.put(`/auth/profile/${id}`, { nome, email, telefone, cidade });
}
