import axios from "axios";

const URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_API_KEY;

const axiosClient = axios.create({
    baseURL: URL,
    headers: {
        "x-api-key": TOKEN,
    },
    withCredentials: true
});


// const getCategories = () => axiosClient.get("/categories?populate=*");
// const getDoctors = () => axiosClient.get("/doctors?populate=*");
const registerPatient = (userData) => axiosClient.post("/auth/register/patient", userData);
const registerDoctor = (doctorData) => axiosClient.post("/auth/register/doctor", doctorData)
const login = (credentials) => axiosClient.post("/auth/login", credentials);
const logout = () => axiosClient.post("/auth/logout");
export default {
    // getCategories,
    // getDoctors,
    registerPatient,
    registerDoctor,
    login,
    logout
};