import React from "react";
import {
  Modal,
  Button,
  Badge,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "flowbite-react";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineInformationCircle,
  HiOutlineLink,
  HiX, // أيقونة الإغلاق الافتراضية لـ Modal.Header
  HiCheckCircle,
  HiExclamationCircle,
  HiOutlineClipboardList, // أيقونة لنوع الاستشارة أو الملاحظات
} from "react-icons/hi";
import { IoVideocamOutline, IoBusinessOutline } from "react-icons/io5"; // أيقونات إضافية
import { FaUserMd, FaUserInjured, FaTag, FaStickyNote } from "react-icons/fa"; // أيقونات إضافية

import formatDateTime from "../../../utils/formatDateTime";
import parseImgUrl from "../../../utils/parseImgUrl";
import flowbit from "../../../config/flowbit";
import { TbReportSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

// مكون مساعد لعرض تفصيلة مع أيقونة
const DetailItem = ({
  icon: IconComponent,
  label,
  value,
  valueClassName = "text-gray-800 dark:text-gray-200",
  children,
}) => (
  <div className="flex items-start py-2.5">
    {IconComponent && (
      <IconComponent className="w-5 h-5 text-primaryColor flex-shrink-0 mt-1 ml-3" />
    )}{" "}
    {/* ml-3 للغة العربية */}
    <div className="flex-1">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}:</p>
      {children ? (
        <div className={`text-md font-medium ${valueClassName}`}>
          {children}
        </div>
      ) : (
        <p className={`text-md font-medium ${valueClassName}`}>
          {value || "غير متوفر"}
        </p>
      )}
    </div>
  </div>
);

// مكون مساعد لعرض رابط لملف شخصي
const ProfileLink = ({ userId, userType, role, children }) => (
  <Button
    as="a" // استخدام as="a" مع flowbite Button قد لا يعمل دائما، استخدم Link من react-router-dom إذا لزم الأمر
    href={`${
      role === "patient"
        ? `/doctors/${userId}`
        : `/dashboard/${userType}s/${userId}`
    }`} // مثال: /dashboard/doctors/ID أو /dashboard/patients/ID
    target="_blank" // لفتح في نافذة جديدة
    rel="noopener noreferrer"
    color="light"
    size="xs"
    theme={flowbit.button}
    className="inline-flex items-center gap-1 mt-1 !p-1.5"
  >
    {children || "عرض الملف الشخصي"}
    <HiOutlineLink className="w-3 h-3" />
  </Button>
);

// دالة لتحديد شارة الحالة المناسبة
const getStatusBadge = (status) => {
  let statusText = status || "غير معروف";
  let color = "gray";
  let Icon = HiOutlineInformationCircle;

  switch (status?.toLowerCase()) {
    case "confirmed":
      statusText = "مؤكد";
      color = "success";
      Icon = HiCheckCircle;
      break;
    case "completed":
      statusText = "مكتمل";
      color = "teal"; // أو success
      Icon = HiCheckCircle;
      break;
    case "pending":
      statusText = "قيد الانتظار";
      color = "warning";
      Icon = HiOutlineClock;
      break;
    case "cancelled":
      statusText = "ملغي";
      color = "failure";
      Icon = HiExclamationCircle;
      break;
    case "rejected":
      statusText = "مرفوض";
      color = "failure";
      Icon = HiExclamationCircle;
      break;
    default:
      statusText = status || "غير معروف";
  }
  return (
    <Badge
      color={color}
      icon={Icon}
      theme={flowbit.badge}
      className="text-sm px-2.5 py-1"
    >
      {statusText}
    </Badge>
  );
};
export default function AppointmentDetailsModal({
  role,
  open,
  onClose,
  appointment,
}) {
  if (!appointment) {
    return null; // لا تعرض شيئًا إذا لم يكن هناك موعد محدد
  }

  const doctor = appointment.doctor; // افترض أنه كائن متاح
  const patient = appointment.patient; // افترض أنه كائن متاح

  return (
    <Modal
      show={open}
      onClose={onClose}
      size="xl"
      popup
      theme={flowbit.modal}
      dir="rtl"
    >
      <ModalHeader className="border-b border-gray-200 dark:border-gray-700 !p-4">
        {" "}
        {/* !p-4 لتجاوز الحشو الافتراضي */}
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          تفاصيل الموعد رقم: #{appointment.consultationId || appointment._id}
        </span>
      </ModalHeader>
      <ModalBody className="max-h-[75vh] overflow-y-auto custom-scrollbar">
        <div className="space-y-5 p-2 sm:p-4">
          <section className="p-4 bg-slate-50 dark:bg-gray-700 rounded-lg shadow">
            <h3 className="text-md font-semibold text-primaryColor mb-3 flex items-center gap-2">
              <HiOutlineInformationCircle size={20} />
              معلومات الموعد
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <DetailItem
                icon={FaTag}
                label="حالة الموعد"
                valueClassName="inline-block"
              >
                {getStatusBadge(appointment.status)}
              </DetailItem>
              <DetailItem
                icon={
                  appointment.type === "online" ||
                  appointment.type === "استشارة عن بعد"
                    ? IoVideocamOutline
                    : IoBusinessOutline
                }
                label="نوع الاستشارة"
                value={
                  appointment.type === "online" ||
                  appointment.type === "استشارة عن بعد"
                    ? "استشارة عن بعد"
                    : appointment.type || "غير محدد"
                }
              />
              <DetailItem
                icon={HiOutlineCalendar}
                label="التاريخ"
                value={formatDateTime(appointment.date, "arabic")}
              />
              <DetailItem
                icon={HiOutlineClock}
                label="الوقت"
                value={formatDateTime(appointment.date, "time")}
              />
              <DetailItem
                icon={HiOutlineClock}
                label="المدة التقريبية"
                value={`${appointment.duration || "غير محددة"} دقيقة`}
              />
              <DetailItem
                icon={HiOutlineCurrencyDollar}
                label="السعر"
                value={`${
                  appointment.price !== undefined
                    ? appointment.price + " دج"
                    : "غير محدد"
                }`}
              />
            </div>
          </section>

          {/* قسم معلومات الطبيب */}
          {doctor && (
            <section className="p-4 bg-slate-50 dark:bg-gray-700 rounded-lg shadow">
              <h3 className="text-md font-semibold text-primaryColor mb-3 flex items-center gap-2">
                <FaUserMd size={18} />
                معلومات الطبيب
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={
                    doctor.profileImage
                      ? parseImgUrl(doctor.profileImage)
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          doctor.fullName?.first || ""
                        )}+${encodeURIComponent(
                          doctor.fullName?.second || ""
                        )}&background=0D8ABC&color=fff&font-size=0.4&format=svg`
                  }
                  alt={`د. ${doctor.fullName?.first} ${doctor.fullName?.second}`}
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                />
                <div className="text-center sm:text-right">
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">
                    د. {doctor.fullName?.first} {doctor.fullName?.second}
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    {doctor.doctorProfile?.specialization || "تخصص غير محدد"}
                  </p>
                  <ProfileLink
                    userId={doctor._id}
                    userType="doctor"
                    role="patient"
                  />
                </div>
              </div>
            </section>
          )}

          {/* قسم معلومات المريض */}
          {role === "patient"
            ? ""
            : patient && (
                <section className="p-4 bg-slate-50 dark:bg-gray-700 rounded-lg shadow">
                  <h3 className="text-md font-semibold text-primaryColor mb-3 flex items-center gap-2">
                    <FaUserInjured size={18} />
                    معلومات المريض
                  </h3>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <img
                      src={
                        patient.profileImage
                          ? parseImgUrl(patient.profileImage)
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              patient.fullName?.first || ""
                            )}+${encodeURIComponent(
                              patient.fullName?.second || ""
                            )}&background=6D28D9&color=fff&font-size=0.4&format=svg`
                      }
                      alt={`${patient.fullName?.first} ${patient.fullName?.second}`}
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                    />
                    <div className="text-center sm:text-right">
                      <p className="text-lg font-semibold text-gray-800 dark:text-white">
                        {patient.fullName?.first} {patient.fullName?.second}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {patient.email || "لا يوجد بريد إلكتروني"}
                      </p>
                      {patient.phone && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          هاتف: {patient.phone}
                        </p>
                      )}
                      <ProfileLink userId={patient._id} userType="patient" />
                    </div>
                  </div>
                </section>
              )}

          {/* قسم الملاحظات */}
          {appointment.notes && (
            <section className="p-4 bg-slate-50 dark:bg-gray-700 rounded-lg shadow">
              <h3 className="text-md font-semibold text-primaryColor mb-3 flex items-center gap-2">
                <FaStickyNote size={16} />
                ملاحظات المريض للحجز
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap bg-white dark:bg-gray-800 p-3 rounded-md border">
                {appointment.notes}
              </p>
            </section>
          )}

          {/* قسم معلومات إضافية عن الموعد (إذا لزم الأمر) */}
          <section className="p-4 bg-slate-50 dark:bg-gray-700 rounded-lg shadow">
            <h3 className="text-md font-semibold text-primaryColor mb-3 flex items-center gap-2">
              <HiOutlineClipboardList size={20} />
              معلومات إدارية
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <DetailItem
                icon={HiOutlineCalendar}
                label="تاريخ إنشاء الموعد"
                value={formatDateTime(appointment.createdAt, "date")}
              />
            </div>
          </section>
          {appointment.status === "confirmed" ? (
            <Button
              href={`/appointments/${appointment._id}/report`}
              color="gray"
              outline
              theme={flowbit.button}
              className="w-full sm:w-auto !px-5 !py-2 m-auto"
            >
              <TbReportSearch size={20} className="ml-2" />
              عرض التقرير
            </Button>
          ) : (
            ""
          )}
        </div>
      </ModalBody>
      <ModalFooter className="flex justify-start border-t border-gray-200 dark:border-gray-700 !p-4">
        {" "}
        {/* Footer aligned to start (right in RTL) */}
        <Button
          color="gray"
          onClick={onClose}
          theme={flowbit.button}
          className="focus:ring-gray-300 dark:focus:ring-gray-600"
        >
          <HiX className="ml-2 h-4 w-4" /> {/* ml-2 في العربية */}
          إغلاق
        </Button>
        {/* يمكنك إضافة أزرار إجراءات أخرى هنا إذا لزم الأمر */}
        {/* مثال:
        {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
          <Button color="failure" onClick={() => { alert('منطق إلغاء الموعد هنا'); onClose(); }} theme={flowbit.button} className="mr-2">
            إلغاء الموعد
          </Button>
        )}
        */}
      </ModalFooter>
    </Modal>
  );
}
