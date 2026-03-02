/**
 * DTO = define o que PODE entrar no POST.
 * Repare que NÃO tem isAdmin.
 */
export class CreateUsuarioDTO {
  nome!: string;
  email!: string;
}
