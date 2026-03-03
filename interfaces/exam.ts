export default interface Exam {
  id_agendamento: number;
  titulo: string;
  descricao: string;
  medico: string;
  data: string;
  local: string;
  id_paciente: number;
  lembrete_enviado: boolean;
}