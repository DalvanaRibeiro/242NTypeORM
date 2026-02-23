// import "reflect-metadata" - Necessário para o TypeORM funcionar corretamente com decorators

// (ex.: @Entity, @Column, @ManyToOne etc)
import "reflect-metadata"

// Importa a classe DataSource do TypeORM
// DataSource é quem representa a conexão com o banco de dados
import { DataSource } from "typeorm"

// Importa o dotenv para ler as variáveis do arquivo .env
import dotenv from "dotenv"
// Carrega as variáveis do arquivo .env para dentro do process.env
// isso permite usar process.env.DB_HOST, por exemplo
dotenv.config()
/**
 * DataSource = configuração do TypeORM (Conexão com MySQL)
 * Aqui estamos dizendo:
 * -Qual banco usar
 * - Como conectar
 * - Quais entidades fazem parte do projeto
 */
export const AppDataSource = new DataSource({
    // tipo de banco que estamos usando
    type: "mysql",
    // endereço do servidor do banco
    host: process.env.DB_HOST,

    //Porta do MySQL
    port: Number(process.env.DB_PORT || 3306),
    // Usuário do banco
    username: process.env.DB_USER,
    //Senha do banco
    password: process.env.DB_PASS,
    // synchronize: true
    // Faz o TypeORM criar/atualizar as tabelas automaticamente
    // Em desenvolvimento ok ser true em produção será false 
    synchronize: true,
   
})