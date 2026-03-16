export default interface User {
  id_usuario: number;
  nome: string;
  email: string;
  cadastro_confirmado: boolean;
  role: string;
  foto_perfil: string | null;
  ativar_notificacoes: boolean;
}
