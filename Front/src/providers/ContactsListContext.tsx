import { createContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { IContact } from "../pages/HomePage/@types";
import { toast } from "react-toastify"
import { ContactProviderProps, ContactsValues, FormData } from "./@types";



export const ContactsListContext = createContext<ContactsValues>({} as ContactsValues);

export const ContactsListProvider = ({ children }:ContactProviderProps) => {
  const [contacts, setContacts] = useState<IContact[]>([]);

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenRemove, setIsOpenRemove] = useState(false);

 


  useEffect(() => {
    const getContactsToList = async () => {
      try {
        const { data } = await api.get("/contacts");
        setContacts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getContactsToList();

  }, []);

  const addContact = async (formData: FormData) => {
    try {
      const token = localStorage.getItem("@TOKEN");

      const newContact = {
        ...formData,
      };

      toast.success("Contato criado com sucesso", {
        theme: "dark",
        autoClose: 1500,
      });

      const { data } = await api.post("/contacts", newContact, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContacts((contacts) => [...contacts, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async (contactId: string) => {
    try {
      const token = localStorage.getItem("@TOKEN");

      toast.success("Contato deletado com sucesso", {
        theme: "dark",
        autoClose: 1500,
      });

      await api.delete(`/contacts/${contactId}`
      , 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      setContacts((contactList) => contactList.filter((contact) => contact.id !== contactId));

    } catch (error) {
      console.log(error);
    }
  };

  const editContact = async (formData: FormData, contactId: string) => {
    try {
      const token = localStorage.getItem("@TOKEN");

      const newContact = {
        id: contactId,
        ...formData,
      };

      toast.success("Contato editado com sucesso", {
        theme: "dark",
        autoClose: 1500,
      });

      const { data } = await api.patch(`/contacts/${contactId}`, newContact, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContacts((contacts) =>
        contacts.map((contact) => contact.id === contactId ? { ...contact, ...data } : contact
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <ContactsListContext.Provider
      value={{
        contacts,
        setContacts,
        addContact,
        editContact,
        deleteContact,
        isOpenAdd,
        setIsOpenAdd,
        isOpenEdit,
        setIsOpenEdit,
        isOpenRemove, 
        setIsOpenRemove,
      }}
    >
      {children}
    </ContactsListContext.Provider>
  );
};
