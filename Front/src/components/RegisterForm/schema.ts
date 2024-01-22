import { z } from "zod";
import { FormEvent } from "react"

export const registerFormSchema = z.object({
    name: z
        .string()
        .min(2, "Insira o nome do usuário."),

    email: z
        .string()
        .min(10, "Insira o email.")
        .email("Digite um email válido."),

    password: z
        .string()
        .nonempty("Insira uma senha.")
        .min(8, "A senha precisa conter pelo menos 8 caracteres.")
        .regex(/(?=.*?[A-Z])/, "A senha deve conter pelo menos uma letra maiúscula.")
        .regex(/(?=.*?[a-z])/, "A senha deve conter pelo menos uma letra minuscula.")
        .regex(/(?=.*?[#?!@$%^&*-])/, "A senha deve conter pelo menos um caractere especial.")
        .regex(/(?=.*?[0-9])/, "A senha deve conter pelo menos um número."),

    confirm: z.string().min(1, "Confirme sua senha."),

    telephone: z.string().min(14, "Informe seu contato").max(15, "No máximo 11 digitos"),

}).refine(({password, confirm}) => password === confirm, {
    message: "As senhas não correspondem.",
    path: ["confirm"]
})




export const handlePhone = (e: FormEvent<HTMLInputElement>) => {
    e.currentTarget.maxLength = 15
    let value = e.currentTarget.value

    value = value.replace(/\D/g, '').replace(/(?:(^\+\d{2})?)(?:([1-9]{2})|([0-9]{3})?)(\d{4,5})(\d{4})/, (fullMatch, country, ddd, dddWithZero, prefixTel, suffixTel) => {
        if (country)
            return `${country} (${
                ddd || dddWithZero
            }) ${prefixTel}-${suffixTel}`;
        if (ddd || dddWithZero)
            return `(${ddd || dddWithZero}) ${prefixTel}-${suffixTel}`;
        if (prefixTel && suffixTel) return `${prefixTel}-${suffixTel}`;
        return fullMatch;
    })

    e.currentTarget.value = value
}