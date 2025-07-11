export default interface User {
  idUsuario: number,
  nome: string,
  email: string,
  cadastroConfirmado: boolean,
  token: string,
  role: string,
  idPaciente: number
}
