export default interface User {
  idUsuario: number;
  nome: string;
  email: string;
  cadastroConfirmado: boolean;
  role: string;
  id_paciente: number;
}
