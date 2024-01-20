import { useContext } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TContactSchema, contactSchema, handlePhone } from "./schema"
import { IModalEditTaskProps } from "./@types"

import { Form } from "./style"
import { StyledTitle } from "../../../../styles/typography"
import { ContactModal, Input, Button } from "../../../"
import { ContactsListContext } from "../../../../providers/ContactsListContext"



export const ContactEditModal = ({ toggleModal, setIsOpenEdit, contactId  }: IModalEditTaskProps) => {
  const { register, handleSubmit, formState: {errors}   } = useForm<TContactSchema>({
    resolver: zodResolver(contactSchema)
})
  const { editContact, contacts } = useContext(ContactsListContext)

  const currentContact = contacts.find(contact => contact.id === contactId)


  const onSubmit = async (data: TContactSchema, e: any) => {
    e.preventDefault()
    try {
      await editContact(data, contactId);
      setIsOpenEdit(false);
    } catch (error) {
      console.error("Erro ao editar o contato", error);
    }
  };


  return (
      <ContactModal toggleModal={toggleModal}>

          <Form onSubmit={handleSubmit(onSubmit)}>

            <StyledTitle>Edite o contato</StyledTitle>
              <Input 
                title="Nome" 
                type="text" 
                defaultValue={currentContact!.name}
                placeholder="Digite aqui o nome" 
                {...register("name")} 
                error={errors.name as { message: string } | undefined}/>

              <Input 
                title="Contato" 
                type="text" 
                onKeyUp={
                  handlePhone
                } 
                defaultValue={currentContact!.telephone}
                placeholder="Digite aqui o contato" 
                {...register("telephone")} 
                error={errors.telephone as { message: string } | undefined}/>

              <Input 
                title="Email" 
                type="email" 
                defaultValue={currentContact!.email}
                placeholder="Digite aqui o email" 
                {...register("email")} 
                error={errors.email as { message: string } | undefined}/>   

              <Button type="submit">Editar contato</Button>
          </Form>
      </ContactModal>
  )
}