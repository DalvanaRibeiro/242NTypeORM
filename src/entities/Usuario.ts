// Importa os decorators do TypeORM
// Decorators são anotações que dizem ao ORM como mapear a classe para o banco
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

// @Entity("usuarios")
// Diz ao TypeORM que essa classe representa uma tabela no banco
// O nome da tabela será "usuarios"
@Entity("usuarios")
export class Usuario {

  // @PrimaryGeneratedColumn()
  // Define que esse campo é:
  // - Chave primária (PRIMARY KEY)
  // - Auto incremento (AUTO_INCREMENT no MySQL)
  @PrimaryGeneratedColumn()
  id!: number; 
  // O "!" indica ao TypeScript:
  // "Confie em mim, esse valor será definido depois"
  // Quem define é o ORM quando salva no banco

  // @Column define uma coluna comum da tabela
  // type: varchar → texto
  // length: 120 → tamanho máximo
  @Column({ type: "varchar", length: 120 })
  nome!: string;

  // unique: true → não permite repetir e-mail no banco
  // Isso gera uma restrição UNIQUE no MySQL
  @Column({ type: "varchar", length: 160, unique: true })
  email!: string;

  // type: boolean → vira TINYINT(1) no MySQL
  // default: true → se não informar, começa como ativo
  @Column({ type: "boolean", default: true })
  ativo!: boolean;

  // @CreateDateColumn()
  // O próprio TypeORM preenche automaticamente
  // com a data/hora quando o registro é criado
  @CreateDateColumn()
  createdAt!: Date;

  // @UpdateDateColumn()
  // Atualiza automaticamente sempre que o registro for modificado
  @UpdateDateColumn()
  updatedAt!: Date;
}