import { Link } from "react-router-dom";
import { api } from "../../services/api";
import { useContext, useEffect, useState } from "react";

import { StyledTitle, StyledLogo } from "../../styles/typography"
import { StyledContainer } from "./style"

import { ContactAddModal, ContactEditModal, ContactRemoveModal, UserEditModal, UserRemoveModal, ContactCard } from "../../components";

import { UserContext } from "../../providers/UserContext";
import { ContactsListContext } from "../../providers/ContactsListContext";

import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IContact } from "./@types";




export const HomePage = () => {
    const { user, userLogout, isOpenEditUser, setIsOpenEditUser, setIsOpenRemoveUser, isOpenRemoveUser } = useContext(UserContext)
    const { contacts, setContacts, setIsOpenAdd, setIsOpenEdit, isOpenAdd, isOpenEdit, isOpenRemove, setIsOpenRemove } = useContext(ContactsListContext)

    const [editingContactId, setEditingContactId] = useState<string | null>(null);
    const [removingContactId, setRemovingContactId] = useState<string | null>(null);



    useEffect(() => {
        (
            async () => {
                const response = await api.get("/contacts")
                setContacts(response.data)
            }
        )()
    }, [])


    const toggleModalAdd = () => setIsOpenAdd(!isOpenAdd)
    const toggleModalEdit = () => setIsOpenEdit(!isOpenEdit)
    const toggleModalRemove = () => setIsOpenRemove(!isOpenRemove)
    const toggleModalEditUser = () => setIsOpenEditUser(!isOpenEditUser)
    const toggleModalRemoveUser = () => setIsOpenRemoveUser(!isOpenRemoveUser)


    const handleEditContact = (contact: IContact) => {
        setEditingContactId(contact.id);
        toggleModalEdit();
      };
    const handleRemoveContact = (contact: IContact) => {
        setRemovingContactId(contact.id);
        toggleModalRemove();
      };


    const renderContacts = (contactsToRender: IContact[]) => contactsToRender.map(contact => <ContactCard key={contact.id} contact={contact} 
        editContact={() => handleEditContact(contact)} removeContact={() => handleRemoveContact(contact)
        }/>)


    return(
        <StyledContainer>
            <div className="formBox">

                <div className="navBar">
                    <StyledLogo> <span>Ur</span> Contact</StyledLogo>
                    <Link onClick={(e) => {userLogout(e)}} to="/">Sair</Link>
                </div>


                <section className="headerSection">
                    <header>
                            <StyledTitle>{user.name}</StyledTitle>
                            <div>
                                <MdEdit style={{ width: '20px', height: '20px', cursor: 'pointer'}} onClick={toggleModalEditUser}/>
                                <FaTrashAlt style={{ width: '20px', height: '20px', cursor: 'pointer'}} onClick={toggleModalRemoveUser}/>
                            </div>

                    </header>
                </section>
                
                <div className="principalContent">
                    <section>
                        <StyledTitle>Atualmente <span>{contacts.length}</span> contatos</StyledTitle>

                        <FaPlusCircle style={{ width: '23px', height: '23px', cursor: 'pointer'}} type="button" onClick={toggleModalAdd}/>

                    </section>
                <ul>
                    {renderContacts(contacts)}
                </ul>

                </div>


                {isOpenAdd && <ContactAddModal toggleModal={toggleModalAdd} setIsOpenAdd={setIsOpenAdd} />}

                {isOpenEdit && (
                <ContactEditModal
                    toggleModal={toggleModalEdit}
                    setIsOpenEdit={setIsOpenEdit}
                    contactId={editingContactId || ''}
                />
                )}
                {
                isOpenRemove && <ContactRemoveModal toggleModal={toggleModalRemove} setIsOpenRemove={setIsOpenRemove} contactId={removingContactId || ''} />
                }

                {isOpenEditUser && <UserEditModal toggleModal={toggleModalEditUser} setIsOpenEditUser={setIsOpenEditUser} clientId={user.id || ''}/>}

                {isOpenRemoveUser && <UserRemoveModal toggleModal={toggleModalRemoveUser} setIsOpenRemoveUser={setIsOpenRemoveUser} clientId={user.id || ''}/>}

            </div>
        </StyledContainer>
    )
}