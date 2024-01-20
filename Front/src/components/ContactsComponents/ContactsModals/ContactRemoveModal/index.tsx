import { useContext } from "react"
import { ContactModal } from "../../../"
import { ContactsListContext } from "../../../../providers/ContactsListContext"
import { StyledTitle } from "../../../../styles/typography"
import { Div } from "./style";
import { IModalRemoveTaskProps } from "./@types";



export const ContactRemoveModal = ({ toggleModal, setIsOpenRemove, contactId  }: IModalRemoveTaskProps) => {
  const { deleteContact } = useContext(ContactsListContext)


  const onSubmit = async () => {
    try {
      await deleteContact(contactId);
      setIsOpenRemove(false);
    } catch (error) {
      console.error("Erro ao remover o contato:", error);
    }
  };


  return (
      <ContactModal toggleModal={toggleModal}>
        <Div>

          <StyledTitle>Deseja mesmo excluir esse contato?</StyledTitle>
          <button onClick={() => onSubmit()}>Sim</button>
          <button onClick={() => setIsOpenRemove(false)}>Não</button>
        </Div>


      </ContactModal>
  )
}