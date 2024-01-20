import {Dispatch, SetStateAction} from "react"

export interface IModalRemoveTaskProps {
    toggleModal: () => void;
    setIsOpenRemove: Dispatch<SetStateAction<boolean>>;
    contactId: string;
  }