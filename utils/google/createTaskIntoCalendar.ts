import type Exam from "~/interfaces/exam";

export default async function createTaskIntoCalendar(exam: Exam) {
    const { $api } = useNuxtApp();
    const token = useCookie("token");

    const response = await $api(`/agendamentos/google`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token.value}`,
        },
        body: exam
    });
    return response;
}