import { z } from "zod";

export const loginFormSchema = z.object({
    email: z
        .string()
        .nonempty("Insira o email.")
        .email("Digite um email válido."),

        password: z
        .string()
        .nonempty("Insira uma senha.")
        .min(8, "Insira uma senha válida.")
        .regex(/(?=.*?[A-Z])/, "Insira uma senha válida.")
        .regex(/(?=.*?[a-z])/, "Insira uma senha válida.")
        .regex(/(?=.*?[#?!@$%^&*-])/, "Insira uma senha válida.")
        .regex(/(?=.*?[0-9])/, "Insira uma senha válida."),
})