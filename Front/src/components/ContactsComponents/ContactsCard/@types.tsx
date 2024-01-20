import { IContact } from "../../../pages/HomePage/@types"

export interface ICardProps {
    contact: IContact
    editContact: (id: string) => void;
    removeContact: (id: string) => void;
}