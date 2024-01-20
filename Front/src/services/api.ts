import axios from "axios";

export const api = axios.create({
    baseURL: "https://ur-contact.onrender.com",
    timeout: 8000,
})