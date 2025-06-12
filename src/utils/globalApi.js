import axios from "axios";
import useAuthStore from "../store/authStore";
import useToastStore from "../store/toastStore";
import useAuthModalStore from "../store/authModalStore";

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
            const { openModal } = useAuthModalStore.getState()
            clearUser();
            window.location.href = "/";
            openModal("login")
        }

        return Promise.reject(error);
    }
);




const setDoctorAvailability = (doctorId, availabilityData) =>
    axiosClient.patch(`/users/update-availability/${doctorId}`, availabilityData);
const getTopDoctors = () => axiosClient.get("/users/top-doctors");
const setRejectDoctor = (doctorId, reason) => axiosClient.patch(`/users/doctors/${doctorId}/reject`, reason);
const setApproveConsultation = (consultationId) => axiosClient.patch(`/consultations/${consultationId}/approve`);
const setRejectConsultation = (consultationId) => axiosClient.patch(`/consultations/${consultationId}/reject`);
const setApproveDoctor = (doctorId) => axiosClient.patch(`/users/doctors/${doctorId}/approve`);
const updateDoctor = (doctorId, data) => axiosClient.patch(`/users/doctors/edit/${doctorId}`, data)
const getAllApprovedDoctors = (queryString) => axiosClient.get(`${queryString ? `/users/doctors?${queryString}` : "/users/doctors"}`);
const getDoctorByRequestId = (requestId) => axiosClient.get(`users/doctors/requests/${requestId}`)
const getDoctorById = (id) => axiosClient.get(`users/doctors/${id}`)
const getDoctorPatients = (id) => axiosClient.get(`users/doctors/${id}/patients`)
const getPatientById = (id) => axiosClient.get(`users/patients/${id}`)
const adminUpdatePatient = (id, data) => axiosClient.patch(`users/patients/edit/${id}`, data)
const updatePatient = (data) => axiosClient.patch(`users/patients`, data)
const updateDoctorProfile = (data) => axiosClient.patch(`users/doctors/profile`, data)
const getDoctorSlots = (doctorId, date) => axiosClient.get(`/users/doctors/${doctorId}/available-slots?date=${date}`)
const createConsultation = (data) => axiosClient.post("/consultations", data)
const getConsultationById = (id) => axiosClient.get(`/consultations/${id}`)
const getAllPatients = (queryString) => axiosClient.get(`${queryString ? `/users/patients?${queryString}` : "/users/patients"}`);
const getMyBalance = () => axiosClient.get("/wallet/my-balance")
const getAllAppointments = (params) => axiosClient.get("/consultations", { params });
const getAllChargeRequests = (queryString) => axiosClient.get(`${queryString ? `/charge?${queryString}` : "/charge"} `)
const getLastUsers = () => axiosClient.get("/users?limit=10&sort=-createdAt");
const registerPatient = (userData) => axiosClient.post("/auth/register/patient", userData);
const registerDoctor = (doctorData) => axiosClient.post("/auth/register/doctor", doctorData)
const getDoctorsRequests = () => axiosClient.get("/users?role=doctor&doctorProfile.status=pending&sort=-createdAt");
const getAdminHomeStates = () => axiosClient.get("/dashboard/admin/home");
const getDoctorHomeStates = () => axiosClient.get("/dashboard/doctor/home");
const getPatientHomeStates = () => axiosClient.get("/dashboard/patient/home");
const getAdminWalletStates = () => axiosClient.get("/dashboard/admin/wallet");
const createChargeRequest = (data) => axiosClient.post("/charge", data);
const getChargeRequestById = (id) => axiosClient.get(`/charge/${id}`);
const approveChargeRequest = (id) => axiosClient.post(`/charge/${id}/approve`);
const rejectChargeRequest = (id) => axiosClient.post(`/charge/${id}/reject`);
const getPatientNextAppointment = () => axiosClient.get("/consultations/patient/next-appointment")
const getDoctorNextAppointment = () => axiosClient.get("/consultations/doctor/next-appointment")
const getMyAppointments = (params) => axiosClient.get("/consultations/patient/my-appointment", { params })
const getMyTransactions = () => axiosClient.get("/transaction/my-transactions")
const toggleFavoriteDoctor = (doctorId) =>
    axiosClient.post(`/users/patients/favorite-doctors/${doctorId}`);
const getFavoriteDoctors = () => axiosClient.get("/users/patients/favorite-doctors");
const doctorCreateConsultationReport = (consultationId, data) => axiosClient.post(`/consultation-reports/${consultationId}`, data)
const getConsultationReportById = (consultationId) => axiosClient.get(`/consultation-reports/${consultationId}`)

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
    rejectChargeRequest,
    getPatientById,
    adminUpdatePatient,
    getDoctorHomeStates,
    getPatientHomeStates,
    getPatientNextAppointment,
    getDoctorPatients,
    updatePatient,
    getConsultationById,
    setApproveConsultation,
    setRejectConsultation,
    getMyAppointments,
    getMyTransactions,
    toggleFavoriteDoctor,
    getFavoriteDoctors,
    getDoctorNextAppointment,
    doctorCreateConsultationReport,
    getConsultationReportById,
    updateDoctorProfile
};