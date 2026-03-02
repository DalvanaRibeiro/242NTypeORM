// Necessário para o TypeORM funcionar corretamente com decorators
// (ex.: @Entity, @Column, @ManyToOne, etc.)
import "reflect-metadata";

// Importa a classe DataSource do TypeORM
// DataSource é quem representa a conexão com o banco de dados
import { DataSource } from "typeorm";

// Importa o dotenv para ler variáveis do arquivo .env
// (DB_HOST, DB_USER, DB_PASS etc.)
import dotenv from "dotenv";

// Importa a entidade Usuario
// Entidade = classe que representa uma tabela no banco
import { Usuario } from "../entities/Usuario";//******

// Carrega as variáveis do arquivo .env para dentro do process.env
// Isso permite usar process.env.DB_HOST, por exemplo
dotenv.config();

/**
 * DataSource = configuração do TypeORM (conexão com MySQL)
 * Aqui estamos dizendo:
 * - Qual banco usar
 * - Como conectar
 * - Quais entidades fazem parte do projeto
 */
export const AppDataSource = new DataSource({

  // Tipo de banco que estamos usando
  // Poderia ser: postgres, sqlite, mssql etc.
  type: "mysql",

  // Endereço do servidor do banco
  // Normalmente: "localhost"
  host: process.env.DB_HOST,

  // Porta do MySQL
  // Se não existir no .env, usa 3306 como padrão
  port: Number(process.env.DB_PORT || 3306),

  // Usuário do banco
  username: process.env.DB_USER,

  // Senha do banco
  password: process.env.DB_PASS,

  // Nome do banco de dados
  database: process.env.DB_NAME,

  // synchronize: true

  synchronize: true,

  // logging: false
  // Se colocar true, o TypeORM mostra no console
  // todas as queries SQL executadas
  logging: false,

  // Lista das entidades que o TypeORM deve mapear
  // Cada entidade vira uma tabela no banco
  entities: [Usuario],
});