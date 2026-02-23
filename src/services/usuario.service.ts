import { AppDataSource } from "../database/data-source";
import { Usuario } from "../entities/Usuario";
/**
 * Service = regra de negócio + acesso ao banco
 * Ele não reconhece Express(request/response)
 */
export class UsuarioService{
    // Pega o "repositório" da entidade Usuario (CRUD pronto do TypeORM)
    private repo = AppDataSource.getRepository(Usuario)
}