import { Dispatch, SetStateAction } from "react"

export interface IModalEditTaskProps {
    toggleModal: () => void;
    setIsOpenEdit: Dispatch<SetStateAction<boolean>>;
    contactId: string;
  }