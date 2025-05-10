import { HiCalendar, HiChartPie, HiStar, HiUsers, HiViewBoards } from "react-icons/hi";

export const sidebarItems = [
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
