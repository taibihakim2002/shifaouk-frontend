import { BiHistory, BiWallet } from "react-icons/bi";
import { FaCalendarCheck, FaUserAlt } from "react-icons/fa";
import { HiCalendar, HiChartPie, HiStar, HiUsers, HiViewBoards } from "react-icons/hi";

export const sidebarAdminItems = [
    {
        "title": "لوحة التحكم",
        "href": "/dashboard",
        "icon": HiChartPie
    },
    {
        "title": "الرحلات",
        "href": "/dashboard/tours",
        "icon": HiViewBoards
    },
    {
        "title": "الحجوزات",
        "href": "/dashboard/bookings",
        "icon": HiCalendar,
        "label": "جديد",
        "labelColor": "success"
    },
    {
        "title": "المستخدين",
        "href": "/dashboard/users",
        "icon": HiUsers,
        "label": "2",
        "labelColor": "success"
    },
    {
        "title": "المراجعات",
        "href": "/dashboard/reviews",
        "icon": HiStar
    },

]
export const sidebarDoctorItems = [
    {
        "title": "لوحة التحكم",
        "href": "/dashboard",
        "icon": HiChartPie
    },
    {
        "title": "الرحلات",
        "href": "/dashboard/tours",
        "icon": HiViewBoards
    },
    {
        "title": "الحجوزات",
        "href": "/dashboard/bookings",
        "icon": HiCalendar,
        "label": "جديد",
        "labelColor": "success"
    },
    {
        "title": "المستخدين",
        "href": "/dashboard/users",
        "icon": HiUsers,
        "label": "2",
        "labelColor": "success"
    },
    {
        "title": "المراجعات",
        "href": "/dashboard/reviews",
        "icon": HiStar
    },

]
export const sidebarPatientItems = [
    {
        "title": "نظرة عامة ",
        "href": "/dashboard",
        "icon": HiChartPie
    },
    {
        "title": "الملف الشخصي",
        "href": "/dashboard/profile",
        "icon": FaUserAlt
    },
    {
        "title": "ادارة المواعيد",
        "href": "/dashboard/appointments",
        "icon": FaCalendarCheck,
    },
    {
        "title": "ادارة المحفظة",
        "href": "/dashboard/wallet",
        "icon": BiWallet,
        "label": "2",
        "labelColor": "success"
    },
    {
        "title": "السجل ",
        "href": "/dashboard/history",
        "icon": BiHistory
    },
    {
        "title": "المفضلة ",
        "href": "/dashboard/favorite",
        "icon": HiStar
    },

]
