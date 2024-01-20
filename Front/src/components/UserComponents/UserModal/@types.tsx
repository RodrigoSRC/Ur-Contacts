import { ReactNode } from "react"

export interface IModalProps {
    toggleModal: () => void
    blockClosing?: boolean
    children: ReactNode
}