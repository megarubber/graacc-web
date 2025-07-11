import type Exam from "./exam";

export default interface Notification {
  id_notificacao: number;
  data: string;
  lida: boolean;
  agendamento: Exam;
}
