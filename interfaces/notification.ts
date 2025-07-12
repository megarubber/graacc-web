import type Exam from "./exam";

export default interface Notification {
  idNotificacao: number;
  data: string;
  lida: boolean;
  idAgendamento: number;
}
