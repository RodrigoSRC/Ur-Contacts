import { SubmitHandler  } from "react-hook-form";
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "../";
import { loginFormSchema } from "./loginFormSchema";
import { Form } from "./style";

import { useContext } from "react";
import { UserContext } from "../../providers/UserContext";

import { StyledParagraph, StyledTitle } from "../../styles/typography";
import { ILoginFormValues } from "./@types";


export const LoginForm = () => {

    const { userLogin } = useContext(UserContext);

    const { 
        register, 
        handleSubmit, 
        formState: {errors}  
    } = useForm<ILoginFormValues>({
        resolver: zodResolver(loginFormSchema)
    });


    const submit: SubmitHandler<ILoginFormValues> = (formData) => {
        userLogin(formData)
    }


    return(
        <Form onSubmit={handleSubmit(submit)} noValidate>
            <StyledTitle fontWeight="bold">Login</StyledTitle>

            <Input 
                title="Email" 
                type="text"
                placeholder="Digite aqui seu email" 
                {...register("email")} 
                error={errors.email as { message: string } | undefined}/>

            <Input 
                title="Senha" 
                type="password" 
                placeholder="Digite aqui sua senha" 
                {...register("password")} 
                error={errors.password as { message: string } | undefined}/>

            <Button tp="login" type="submit">Entrar</Button>

            <StyledParagraph>Ainda não possui uma conta?</StyledParagraph>

            <Link to="/register">Cadastre-se</Link>

        </Form>
    )
}