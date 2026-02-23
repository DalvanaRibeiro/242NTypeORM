// Importa os decoators do TypeORM
// Decorators são anotações que dizem ao ORM como mapear a classe para o banco 
import{
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm"
// @Entity ("usuarios")
// Diz ao TypeORM que essa classe representa uma tabela no banco
// e o nome da tabela será "usuarios"
@Entity("usuarios")
export class Usuario{
    // @PrimaryGeneratedColumn()
    // Define que esse campo é:
    // -Chave primária (PRIMARY KEY)
    // -Auto incremento (AUTO_INCREMENT no MySQL)
    @PrimaryGeneratedColumn()
    id!: number
    // O "!" indica ao TypeScript: esse valor será definido depois pelo ORM
    

    // @Column define uma coluna comum da tabela
    // type: varchar -> texto
    // length: 120 -> tamanho máximo
    @Column({type: "varchar", length: 120})
    nome!: string
    //unique: true -> não permite repetir e-mail no banco
    // Isso gera uma restrição UNIQUE no MySQL
    @Column({type: "varchar", length: 160, default: true})
    ativo!: boolean
    //@CreateDateColumn()
    // O próprio TypeORM preenche automaticamente
    // com a data/hora quando o registro é criado
    @CreateDateColumn()
    createdAt!: Date
    // @UpdateDateColumn()
    // Atualiza automaticamente sempre que o registro for modificado
    @UpdateDateColumn()
    updatedAt!: Date
}