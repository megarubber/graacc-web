export default interface User {
  id_usuario: number;
  nome: string;
  email: string;
  cadastro_confirmado: boolean;
  role: string;
  id_paciente: number;
  foto_perfil: string | null;
}
