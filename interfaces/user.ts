export default interface User {
  id_usuario: number;
  nome: string;
  email: string;
  cadastroConfirmado: boolean;
  role: string;
  id_paciente: number;
}
