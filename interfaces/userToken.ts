import type Patient from "./patient";
import type User from "./user";
import type Notification from "./notification";

export default interface UserToken {
  usuario: User;
  paciente: Patient;
  notificacoes: Notification[];
  token: string;
}
