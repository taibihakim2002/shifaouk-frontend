import { BiHistory, BiWallet } from "react-icons/bi";
import { FaCalendarCheck, FaUserAlt } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { HiCalendar, HiChartPie, HiStar, HiUsers, HiViewBoards } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";

export const sidebarAdminItems = [
    {
        "title": "لوحة التحكم",
        "href": "/dashboard",
        "icon": HiChartPie
    },
    {
        "title": "الاطباء",
        "href": "/dashboard/doctors",
        "icon": FaUserDoctor
    },
    {
        "title": "المرضى",
        "href": "/dashboard/patients",
        "icon": HiUsers,
    },

    {
        "title": "ادارة المواعيد",
        "href": "/dashboard/appointments",
        "icon": FaCalendarCheck
    },
    {
        "title": "طلبات الشحن",
        "href": "/dashboard/wallet",
        "icon": BiWallet
    },
    {
        "title": "السجل",
        "href": "/dashboard/history",
        "icon": BiHistory
    },
    {
        "title": "الاعدادات",
        "href": "/dashboard/settings",
        "icon": IoIosSettings
    },

]
export const sidebarDoctorItems = [
    {
        "title": "نظرة عامة",
        "href": "/dashboard",
        "icon": HiChartPie
    },
    {
        "title": "المرضى",
        "href": "/dashboard/patients",
        "icon": HiUsers
    },
    {
        "title": "الملف الشخصي",
        "href": "/dashboard/profile",
        "icon": FaUserAlt,
    },
    {
        "title": "ادارة المواعيد",
        "href": "/dashboard/appointments",
        "icon": FaCalendarCheck,
    },
    {
        "title": " المحفظة",
        "href": "/dashboard/wallet",
        "icon": BiWallet
    },
    {
        "title": "السجل ",
        "href": "/dashboard/history",
        "icon": BiHistory
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
