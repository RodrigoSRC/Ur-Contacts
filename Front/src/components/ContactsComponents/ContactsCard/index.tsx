import { CardProps } from "./@types";
import { Li } from "./styles"
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";


export const ContactCard = ({ contact, editContact, removeContact}: CardProps) => {

    return (
        <Li>
            <div className="infos">
                <h3 className="nome">{contact.name}</h3>
                <div className="contacts">
                    <p>{contact.email}</p>
                    <p>
                        {contact.telephone}
                    </p>

                </div>
            </div>

            <div className="buttons">
                <MdEdit style={{ width: '20px', height: '20px', cursor: 'pointer'}} onClick={() => editContact(contact.id)}/>
                <FaTrashAlt style={{ width: '20px', height: '20px', cursor: 'pointer'}} onClick={() => removeContact(contact.id)} />
            </div>
            
        </Li>
    )

}