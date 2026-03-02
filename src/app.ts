import express from "express";
import { usuarioRoutes } from "./routes/usuario.routes";

/**
 * app.ts = configuração do Express (middlewares e rotas)
 * Sem CORS: a API só vai aceitar requisições "tranquilas" do mesmo domínio/origem.
 * (Postman/Insomnia funciona normal.)
 */
export const app = express();

// permite JSON no body
app.use(express.json());

// rotas
app.use("/api", usuarioRoutes);

// rota simples pra teste
app.get("/", (req, res) => res.send("API TypeORM rodando ✅"));
