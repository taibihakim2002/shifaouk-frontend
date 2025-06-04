import axios from "axios";
import useAuthStore from "../store/authStore";
import useToastStore from "../store/toastStore";

const URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_API_KEY;

const axiosClient = axios.create({
    baseURL: URL,
    headers: {
        "x-api-key": TOKEN,
    },
    withCredentials: true
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error)
        if (error.response?.status === 401) {
            const { clearUser } = useAuthStore.getState();
            const { showToast } = useToastStore.getState()
            clearUser();
            window.location.href = "/";
            showToast("login")
        }

        return Promise.reject(error);
    }
);




const setDoctorAvailability = (doctorId, availabilityData) =>
    axiosClient.patch(`/users/update-availability/${doctorId}`, availabilityData);

const getTopDoctors = () => axiosClient.get("/users/top-doctors");
const setRejectDoctor = (doctorId, reason) => axiosClient.patch(`/users/doctors/${doctorId}/reject`, reason);
const setApproveDoctor = (doctorId) => axiosClient.patch(`/users/doctors/${doctorId}/approve`);
const updateDoctor = (doctorId, data) => axiosClient.patch(`/users/doctors/${doctorId}`, data)
const getAllApprovedDoctors = (queryString) => axiosClient.get(`${queryString ? `/users/doctors?${queryString}` : "/users/doctors"}`);
const getDoctorByRequestId = (requestId) => axiosClient.get(`users/doctors/requests/${requestId}`)
const getDoctorById = (id) => axiosClient.get(`users/doctors/${id}`)
const getDoctorSlots = (doctorId, date) => axiosClient.get(`/users/doctors/${doctorId}/available-slots?date=${date}`)
const createConsultation = (data) => axiosClient.post("/consultations", data)
const getAllPatients = (queryString) => axiosClient.get(`${queryString ? `/users/patients?${queryString}` : "/users/patients"}`);
const getMyBalance = () => axiosClient.get("/wallet/my-balance")
const getAllAppointments = (queryString) => axiosClient.get(`${queryString ? `/consultations?${queryString}` : "/consultations"}`)
const getAllChargeRequests = (queryString) => axiosClient.get(`${queryString ? `/charge?${queryString}` : "/charge"}`)
const getLastUsers = () => axiosClient.get("/users?limit=10&sort=-createdAt");
const registerPatient = (userData) => axiosClient.post("/auth/register/patient", userData);
const registerDoctor = (doctorData) => axiosClient.post("/auth/register/doctor", doctorData)
const getDoctorsRequests = () => axiosClient.get("/users?role=doctor&doctorProfile.status=pending&sort=-createdAt");
const getAdminHomeStates = () => axiosClient.get("/dashboard/admin/home");
const getAdminWalletStates = () => axiosClient.get("/dashboard/admin/wallet");
const createChargeRequest = (data) => axiosClient.post("/charge", data);
const getChargeRequestById = (id) => axiosClient.get(`/charge/${id}`);
const approveChargeRequest = (id) => axiosClient.post(`/charge/${id}/approve`);
const rejectChargeRequest = (id) => axiosClient.post(`/charge/${id}/reject`);
const login = (credentials) => axiosClient.post("/auth/login", credentials);
const logout = () => axiosClient.post("/auth/logout");
export default {
    registerPatient,
    registerDoctor,
    login,
    logout,
    getDoctorsRequests,
    getAdminHomeStates,
    getLastUsers,
    getAllApprovedDoctors,
    getAllPatients,
    getAllAppointments,
    setDoctorAvailability,
    getDoctorByRequestId,
    setRejectDoctor,
    setApproveDoctor,
    getTopDoctors,
    getDoctorById,
    updateDoctor,
    getDoctorSlots,
    getMyBalance,
    createConsultation,
    createChargeRequest,
    getAdminWalletStates,
    getAllChargeRequests,
    getChargeRequestById,
    approveChargeRequest,
    rejectChargeRequest
};