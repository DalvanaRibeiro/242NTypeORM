import express from "express";
import { usuarioRoutes } from "./routes/usuario.routes";

import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./docs/swagger";

/**
 * app.ts = configuração do Express (middlewares e rotas)
 
 * (Postman/Insomnia funciona normal.)
 */
export const app = express();

// permite JSON no body
app.use(express.json());
//Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// rotas
app.use("/api", usuarioRoutes);

// rota simples pra teste
app.get("/", (req, res) => res.send("API TypeORM rodando ✅"));

