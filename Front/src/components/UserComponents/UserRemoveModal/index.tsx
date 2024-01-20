import { useContext } from "react"
import { UserModal } from "../../"
import { UserContext } from "../../../providers/UserContext"
import { StyledTitle } from "../../../styles/typography"
import { Form } from "./style";
import { IModalEditTaskProps } from "./@types";

export const UserRemoveModal = ({ toggleModal, setIsOpenRemoveUser, clientId  }: IModalEditTaskProps) => {
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
      <UserModal toggleModal={toggleModal}>
        <Form>
          <StyledTitle>Deseja mesmo excluir seu usuário?</StyledTitle>
          <button onClick={() => onSubmit()}>Sim</button>
          <button onClick={() => setIsOpenRemoveUser(false)}>Não</button>

        </Form>


      </UserModal>
  )
}