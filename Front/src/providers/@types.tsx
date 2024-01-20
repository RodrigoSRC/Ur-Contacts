import { LoginData } from "../pages/LoginPage/validator";
import { Contact } from "../pages/HomePage";


export interface UserProviderProps {
    children: React.ReactNode;
}

export interface UserContextValues {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  userLogin: (data: LoginData) => void;
  userLogout: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  loading: boolean;
  isOpenEditUser: boolean;
  setIsOpenEditUser: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenRemoveUser: boolean;
  setIsOpenRemoveUser: React.Dispatch<React.SetStateAction<boolean>>;
  userRegister: (formData: any) => void;
  deleteUser: (userId: string) => void;
  editUser: (formData: any, userId: string) => void;
}


export interface RegisterFormData {
  name: string;
  email: string;
}

export interface EditFormData {
  name: string;
  email: string;
  password: string;
  telephone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  telephone: string;
}

export interface FormData {
    name: string;
    telephone: string;
    email: string;
  }
  
  
export interface ContactsValues {
    contacts: Contact[];
    setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
    addContact: (formData: any) => Promise<void>;
    editContact: (formData: any, contactId: string) => Promise<void>;
    deleteContact: (contactId: string) => Promise<void>;
    isOpenAdd: boolean;
    setIsOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
    isOpenEdit: boolean;
    setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
    isOpenRemove: boolean; 
    setIsOpenRemove: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  
export interface ContactProviderProps {
    children: React.ReactNode
  }