import "dotenv/config";
import { app } from "./app";
import { AppDataSource } from "./database/data-source";

/**
 * server.ts = inicia o banco e depois sobe o servidor
 */
const PORT = Number(process.env.PORT || 3000);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado ✅");

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar no banco ❌", err);
  });
