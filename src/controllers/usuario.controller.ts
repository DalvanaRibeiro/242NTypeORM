// Importa os tipos Request e Response do Express
// Request = representa a requisição HTTP que chega (params, body, query, headers etc.)
// Response = representa a resposta que vamos enviar (status, json, etc.)
import { Request, Response } from "express";

// Importa o service de Usuário (camada de regras de negócio + acesso a dados)
// O controller NÃO faz regra pesada: ele delega para o service.
import { UsuarioService } from "../services/usuario.service";

/**
 * Controller = recebe HTTP (req/res) e chama o service
 * Aqui fazemos: ler params/body e devolver status codes.
 */

// Cria uma instância do service para reutilizar em todas as rotas deste controller
// (Em projetos maiores, isso pode vir por injeção de dependência)
const service = new UsuarioService();

// Exporta um objeto com métodos (cada método vira um handler de rota)
// Ex.: router.get("/usuarios", UsuarioController.listar)
export const UsuarioController = {
  // =========================
  // GET /usuarios
  // =========================
  async listar(req: Request, res: Response) {
    // try/catch para capturar erros que possam acontecer no service/DB
    try {
      // Chama o service para buscar a lista de usuários no banco
      const lista = await service.listar();

      // Retorna a lista em JSON com status 200 (padrão do res.json)
      return res.json(lista);
    } catch (err: any) {
      // Se der erro inesperado (ex.: banco fora, exception)
      // responde 500 = erro interno do servidor
      return res.status(500).json({ erro: err.message });
    }
  },

  // =========================
  // GET /usuarios/:id
  // =========================
  async buscar(req: Request, res: Response) {
    try {
      // Pega o "id" vindo da URL (/usuarios/10)
      // req.params.id sempre vem como string -> convertemos para number
      const id = Number(req.params.id);

      // Chama o service para buscar o usuário por id
      const user = await service.buscarPorId(id);

      // Retorna o usuário encontrado em JSON (200)
      // OBS: se o service retornar null e você quiser 404, isso deve ser tratado no service ou aqui
      return res.json(user);
    } catch (err: any) {
      // Se o service lançar erro (ex.: "Usuário não encontrado")
      // responde 404 = não encontrado
      return res.status(404).json({ erro: err.message });
    }
  },

  // =========================
  // POST /usuarios
  // =========================
  async criar(req: Request, res: Response) {
    try {
      // Pega dados do body (enviado no JSON pelo cliente)
      // Ex.: { "nome": "Ana", "email": "ana@email.com" }
      const { nome, email } = req.body;

      // Chama o service para validar e criar o usuário
      const novo = await service.criar(nome, email);

      // Retorna o usuário criado com status 201 = created (criado com sucesso)
      return res.status(201).json(novo);
    } catch (err: any) {
      // Se falhar por validação (nome inválido, email inválido, duplicado etc.)
      // responde 400 = requisição inválida (erro do cliente)
      return res.status(400).json({ erro: err.message });
    }
  },

  // =========================
  // PUT /usuarios/:id
  // =========================
  async atualizar(req: Request, res: Response) {
    try {
      // Pega o id da URL e converte para number
      const id = Number(req.params.id);

      // Sem DTO: a gente usa o req.body direto como "dados parciais"
      // Ex.: { "nome": "Novo Nome" } ou { "email": "novo@email.com" }
      // O service decide o que pode/ não pode atualizar.
      const atualizado = await service.atualizar(id, req.body);

      // Retorna o usuário atualizado (200)
      return res.json(atualizado);
    } catch (err: any) {
      // Se der erro (validação, id inválido, etc.)
      // responde 400 = bad request
      return res.status(400).json({ erro: err.message });
    }
  },

  // =========================
  // DELETE /usuarios/:id
  // =========================
  async remover(req: Request, res: Response) {
    try {
      // Pega o id da URL e converte para number
      const id = Number(req.params.id);

      // Chama o service para remover
      // Normalmente retorna algo como: { ok: true } ou mensagem
      const resp = await service.remover(id);

      // Retorna a resposta do service em JSON (200)
      return res.json(resp);
    } catch (err: any) {
      // Se não encontrar o usuário (ou já removido)
      // responde 404 = not found
      return res.status(404).json({ erro: err.message });
    }
  },
};