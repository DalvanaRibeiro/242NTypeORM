import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";

/**
 * Routes = mapeia endpoints -> controller
 */
export const usuarioRoutes = Router();

usuarioRoutes.get("/usuarios", UsuarioController.listar);
usuarioRoutes.get("/usuarios/:id", UsuarioController.buscar);
usuarioRoutes.post("/usuarios", UsuarioController.criar);
usuarioRoutes.put("/usuarios/:id", UsuarioController.atualizar);
usuarioRoutes.delete("/usuarios/:id", UsuarioController.remover);
