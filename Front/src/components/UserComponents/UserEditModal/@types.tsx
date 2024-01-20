import {Dispatch, SetStateAction } from "react"

export interface IModalEditTaskProps {
    toggleModal: () => void;
    setIsOpenEditUser: Dispatch<SetStateAction<boolean>>;
    clientId: string;
  }