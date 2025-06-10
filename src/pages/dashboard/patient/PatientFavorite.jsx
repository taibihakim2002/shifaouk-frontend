import React from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import DashPageHeader from "../../../components/dashboard/common/DashPageHeader";

import flowbit from "../../../config/flowbit";
import { GrFavorite } from "react-icons/gr";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { HardHat } from "lucide-react";

export default function PatientFavorite() {
  return (
    <div
      className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 min-h-[calc(100vh-80px)] flex flex-col"
      dir="rtl"
    >
      <DashPageHeader
        Icon={GrFavorite}
        title="الأطباء المفضلين"
        description="قائمة الأطباء الذين قمت بحفظهم للوصول السريع."
      />

      <div className="flex-grow flex items-center justify-center">
        <div className="text-center p-8 max-w-lg mx-auto">
          {/* Animated Icon */}
          <div className="relative w-40 h-40 mx-auto mb-8">
            <div className="absolute inset-0 bg-primaryColor/10 dark:bg-primaryColor/20 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-primaryColor/10 dark:bg-primaryColor/20 rounded-full animate-pulse-slow animation-delay-200"></div>
            <div className="relative w-full h-full flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg border-2 border-primaryColor/20 dark:border-primaryColor/30">
              <HardHat className="w-20 h-20 text-primaryColor dark:text-primaryColor-400" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
            قريبًا... هذه الصفحة قيد التطوير
          </h2>

          {/* Description */}
          <p className="text-md text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            نحن نعمل بجد لإطلاق هذه الميزة الرائعة في أقرب وقت ممكن. ستتمكن من
            هنا من عرض وإدارة قائمة الأطباء المفضلين لديك بكل سهولة. شكرًا
            لصبرك!
          </p>

          {/* Action Button */}
          <Button
            as={Link}
            to="/dashboard"
            theme={flowbit.button}
            color="primary"
            size="lg"
            className="!px-6 !py-3 shadow-lg hover:shadow-primaryColor/30 dark:hover:shadow-primaryColor/20 transition-all"
            outline
          >
            <HiOutlineArrowLeft className="ml-2 h-5 w-5 transform scale-x-[-1]" />
            العودة إلى لوحة التحكم
          </Button>
        </div>
      </div>
    </div>
  );
}
