import {  useContext } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TContactSchema, contactSchema, handlePhone } from "./schema"

import { Form } from "./style"
import { Input, Button, ContactModal } from "../../.."
import { ContactsListContext } from "../../../../providers/ContactsListContext"
import { StyledTitle } from "../../../../styles/typography"
import { IModalAddTaskProps } from "./@types"



export const ContactAddModal = ({ toggleModal, setIsOpenAdd }: IModalAddTaskProps) => {
  const { register, handleSubmit, formState: {errors}   } = useForm<TContactSchema>({
      resolver: zodResolver(contactSchema), mode: "onChange"
  })
  const { addContact } = useContext(ContactsListContext)

  const createContact = async (data: TContactSchema) => {
    addContact(data)
    setIsOpenAdd(false)
  }


  return (
      <ContactModal toggleModal={toggleModal}>

          <Form onSubmit={handleSubmit(createContact)}>
              <StyledTitle>Adicione novo contato</StyledTitle>
              <Input 
                title="Nome" 
                type="text" 
                placeholder="Digite aqui o nome" 
                {...register("name")} 
                error={errors.name as { message: string } | undefined}/>

              <Input 
                id="telephone"
                title="Contato" 
                type="text" 
                onKeyUp={
                  handlePhone
                } 
                minLength={10}
                maxLength={12}
                placeholder="Digite aqui o contato" 
                {...register("telephone")} 
                error={errors.telephone as { message: string } | undefined}/>

              <Input 
                title="Email" 
                type="email" 
                placeholder="Digite aqui o email" 
                {...register("email")} 
                error={errors.email as { message: string } | undefined}/>      

              <Button type="submit">Registrar contato</Button>
          </Form>
      </ContactModal>
  )
}