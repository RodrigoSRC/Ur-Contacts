import { Dispatch, SetStateAction, useContext } from "react"
import { Modal } from "../Modal"
import { UserContext } from "../../../../providers/UserContext"
import { StyledTitle } from "../../../../styles/typography"
import { Form } from "./style";


interface ModalEditTaskProps {
    toggleModal: () => void;
    setIsOpenRemoveUser: Dispatch<SetStateAction<boolean>>;
    clientId: string;
  }


export const RemoveUserModal = ({ toggleModal, setIsOpenRemoveUser, clientId  }: ModalEditTaskProps) => {
  const { deleteUser } = useContext(UserContext)


  const onSubmit = async () => {
    try {
      await deleteUser(clientId);
      setIsOpenRemoveUser(false);
    } catch (error) {
      console.error("Erro ao remover o usuário:", error);
    }
  };


  return (
      <Modal toggleModal={toggleModal}>
        <Form>
          <StyledTitle>Deseja mesmo excluir seu usuário?</StyledTitle>
          <button onClick={() => onSubmit()}>Sim</button>
          <button onClick={() => setIsOpenRemoveUser(false)}>Não</button>

        </Form>


      </Modal>
  )
}