import { Dispatch, SetStateAction } from "react"

export interface IModalEditTaskProps {
    toggleModal: () => void;
    setIsOpenRemoveUser: Dispatch<SetStateAction<boolean>>;
    clientId: string;
  }
