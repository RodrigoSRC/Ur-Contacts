import {Dispatch, SetStateAction } from "react"

export interface IModalAddTaskProps {
    toggleModal: () => void
    setIsOpenAdd: Dispatch<SetStateAction<boolean>>
  }
  