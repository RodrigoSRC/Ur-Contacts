import { useContext } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TUserSchema, userSchema, handlePhone } from "./schema"
import { UserContext } from "../../../providers/UserContext"

import { UserModal } from "../UserModal"
import { Input } from "../../Input"
import { StyledButton } from "../../Button/Button";

import { Form } from "./styles"
import { StyledTitle } from "../../../styles/typography"

import { IModalEditTaskProps } from "./@types"



export const UserEditModal = ({ toggleModal, setIsOpenEditUser, clientId  }: IModalEditTaskProps) => {
  const { register, handleSubmit, formState: {errors}   } = useForm<TUserSchema>({
    resolver: zodResolver(userSchema)
})
  const { editUser, user } = useContext(UserContext)


  const onSubmit = async (data: TUserSchema) => {
    try {
      await editUser(data, clientId);
      setIsOpenEditUser(false);
    } catch (error) {
      console.error("Erro ao editar o usuário", error);
    }
  };


  return (
      <UserModal toggleModal={toggleModal}>
          <Form onSubmit={handleSubmit(onSubmit)}>
              <StyledTitle>Edite seu usuário</StyledTitle>
              <Input 
                title="Nome" 
                type="text" 
                defaultValue={user.name}
                placeholder="Digite aqui o nome" 
                {...register("name")} 
                error={errors.name as { message: string } | undefined}/>

              <Input 
                title="Contato" 
                type="text" 
                defaultValue={user.telephone}
                onKeyUp={
                  handlePhone
                } 
                placeholder="Digite aqui o contato" 
                {...register("telephone")} 
                error={errors.telephone as { message: string } | undefined}/>

              <Input 
                title="Email" 
                type="email" 
                defaultValue={user.email}
                placeholder="Digite aqui o email" 
                {...register("email")} 
                error={errors.email as { message: string } | undefined}/> 

              <Input 
                title="Senha" 
                type="password" 
                placeholder="Digite aqui sua senha" 
                {...register("password")} 
                error={errors.password as { message: string } | undefined}/> 

              <StyledButton type="submit">Atualizar usuário</StyledButton>
          </Form>
      </UserModal>
  )
}