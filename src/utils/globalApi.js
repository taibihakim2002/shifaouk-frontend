import axios from "axios";

const URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_API_KEY;
console.log("BASE URL:", URL);
console.log("API TOKEN:", TOKEN);
const axiosClient = axios.create({
    baseURL: URL,
    headers: {
        "x-api-key": TOKEN,
    },
});


const getCategories = () => axiosClient.get("/categories?populate=*");
const getDoctors = () => axiosClient.get("/doctors?populate=*");
const registerPatient = (userData) => axiosClient.post("/auth/register", userData);
const login = (credentials) => axiosClient.post("/auth/login", credentials);
export default {
    getCategories,
    getDoctors,
    registerPatient,
    login
};