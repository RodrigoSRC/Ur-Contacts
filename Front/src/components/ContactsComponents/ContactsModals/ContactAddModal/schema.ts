import { FormEvent } from "react"
import { z } from "zod"

export const contactSchema = z.object({
    name: z
        .string()
        .min(2, "Insira o nome do contato."),
    email: z.string().email("Digite um email válido."),
    telephone: z.string()
    .max(15, "No máximo 11 digitos").min(14, "No mínimo 10 digitos")
})

export type TContactSchema = z.infer<typeof contactSchema>



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