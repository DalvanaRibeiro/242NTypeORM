import { AppDataSource } from "../database/data-source";
import { Usuario } from "../entities/Usuario";

/**
 * Service = regra de negócio + acesso ao banco
 * Ele NÃO conhece Express (Request/Response).
 */
export class UsuarioService {
  // Pega o "repositório" da entidade Usuario (CRUD pronto do TypeORM)
  private repo = AppDataSource.getRepository(Usuario);

  // =========================
  // LISTAR
  // =========================
  async listar() {
    // retorna todos os usuários ordenados do mais novo para o mais antigo
    return this.repo.find({ order: { id: "DESC" } });
  }

  // =========================
  // BUSCAR POR ID
  // =========================
  async buscarPorId(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new Error("Usuário não encontrado");
    return user;
  }

  // =========================
  // CRIAR
  // =========================
  async criar(nome: string, email: string) {
    // validações simples (sem DTO, então validamos aqui mesmo)
    if (!nome || nome.trim().length < 2) {
      throw new Error("Nome inválido (mínimo 2 caracteres)");
    }
    if (!email || !email.includes("@")) {
      throw new Error("Email inválido");
    }

    // garante email único
    const existe = await this.repo.findOne({ where: { email } });
    if (existe) throw new Error("Já existe usuário com esse email");

    // create() monta o objeto da entidade
    const novo = this.repo.create({
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      ativo: true,
    });

    // save() insere no banco e devolve com id preenchido
    return this.repo.save(novo);
  }

  // =========================
  // ATUALIZAR
  // =========================
  async atualizar(id: number, dados: Partial<Usuario>) {
    const user = await this.buscarPorId(id);

    // Se vier nome, valida e aplica
    if (dados.nome !== undefined) {
      if (!dados.nome || dados.nome.trim().length < 2) {
        throw new Error("Nome inválido (mínimo 2 caracteres)");
      }
      user.nome = dados.nome.trim();
    }

    // Se vier email, valida e checa unicidade
    if (dados.email !== undefined) {
      if (!dados.email || !dados.email.includes("@")) {
        throw new Error("Email inválido");
      }
      const emailNovo = dados.email.trim().toLowerCase();

      const outro = await this.repo.findOne({ where: { email: emailNovo } });
      if (outro && outro.id !== id) throw new Error("Email já está em uso");

      user.email = emailNovo;
    }

    // Se vier ativo, aplica (boolean)
    if (dados.ativo !== undefined) {
      user.ativo = Boolean(dados.ativo);
    }

    return this.repo.save(user);
  }

  // =========================
  // DELETAR
  // =========================
  async remover(id: number) {
    const user = await this.buscarPorId(id);

    // remove() apaga o registro
    await this.repo.remove(user);

    return { mensagem: "Usuário removido com sucesso" };
  }
}
