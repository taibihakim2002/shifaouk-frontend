// استيرادات تبقى كما هي...
// ... (باقي مكونات DetailItem, CardContainer, getStatusDisplayInfo كما هي) ...

import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Button,
  Modal,
  Textarea,
  Label,
  Badge,
  ModalHeader,
  ModalBody,
  ModalFooter,
  // Spinner, // سيتم استخدام isProcessing في Button مباشرة
} from "flowbite-react";
import DashPageHeader from "../../../../components/dashboard/common/DashPageHeader";
import Skeleton from "../../../../components/common/Skeleton";
import useApiRequest from "../../../../hooks/useApiRequest";
import globalApi from "../../../../utils/globalApi"; // هذا الملف سيحتوي على الدوال الفعلية لـ API
import parseImgUrl from "../../../../utils/parseImgUrl";
import formatDateTime from "../../../../utils/formatDateTime";
import flowbit from "../../../../config/flowbit";

import {
  FaRegEnvelope,
  FaRegCalendarAlt,
  FaRegClock,
  FaMoneyBillWave,
  FaReceipt,
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
  FaPaperclip,
  FaWallet,
} from "react-icons/fa";

import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineExclamationCircle,
  HiOutlineXCircle,
  HiOutlineInformationCircle,
} from "react-icons/hi2";
import { ZoomIn } from "lucide-react";
import useToastStore from "../../../../store/toastStore";

// ... (دالة getStatusDisplayInfo ومكونات DetailItem و CardContainer تبقى كما هي) ...
// دالة عرض حالة الطلب (تبقى كما هي)
const getStatusDisplayInfo = (statusKey) => {
  console.log(statusKey);
  switch (statusKey?.toLowerCase()) {
    case "pending":
      return { text: "في الانتظار", color: "warning", icon: HiOutlineClock };
    case "approved":
      return { text: "مقبول", color: "success", icon: HiOutlineCheckCircle };
    case "rejected":
      return { text: "مرفوض", color: "failure", icon: HiOutlineXCircle };
    default:
      return {
        text: statusKey || "غير معروف",
        color: "gray",
        icon: HiOutlineInformationCircle,
      };
  }
};

// مكون عرض التفاصيل (تصحيح لون الأيقونة والرابط)
const DetailItem = ({
  icon: Icon,
  label,
  value,
  valueClassName = "",
  isLink = false,
  href = "#",
}) => (
  <div className="flex items-start gap-3 sm:gap-4 py-2.5">
    <Icon
      size={20}
      className="text-primaryColor dark:text-primary-400 mt-1 shrink-0"
    />
    <div className="flex-1">
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-0.5">
        {label}
      </p>
      {isLink ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-sm sm:text-base font-semibold text-primaryColor dark:text-primary-300 hover:underline ${valueClassName}`}
        >
          {value}
        </a>
      ) : (
        <p
          className={`text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 ${valueClassName}`}
        >
          {value || "-"}
        </p>
      )}
    </div>
  </div>
);

// حاوية البطاقة (تبقى كما هي)
const CardContainer = ({ title, children, className = "" }) => (
  <div
    className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg p-5 sm:p-6 ${className}`}
  >
    {title && (
      <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white mb-4 sm:mb-5 border-b border-slate-200 dark:border-slate-700 pb-3">
        {title}
      </h3>
    )}
    {children}
  </div>
);

export default function AdminChargeRequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const {
    data: chargeRequestResponse,
    loading,
    error,
    request: fetchChargeRequest,
  } = useApiRequest();

  const {
    data: approveData,
    loading: approveLoading,
    error: approveError,
    request: approveAction,
  } = useApiRequest();
  const {
    data: rejectData,
    loading: rejectLoading,
    error: rejectError,
    request: rejectAction,
  } = useApiRequest();

  const [showProofModal, setShowProofModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const chargeRequest = chargeRequestResponse?.data;

  useEffect(() => {
    if (id) {
      fetchChargeRequest(() => globalApi.getChargeRequestById(id));
    }
  }, [rejectData, approveData]);

  const handleApprove = async () => {
    const { success, data, error } = await approveAction(() =>
      globalApi.approveChargeRequest(id)
    );
    if (success) {
      showToast("success", "تم قبول طلب الشحن بنجاح");
    } else {
      showToast("error", error);
    }
  };

  const handleReject = async () => {
    const { success, data, error } = await rejectAction(() =>
      globalApi.rejectChargeRequest(id)
    );
    if (success) {
      showToast("success", "تم رفض طلب الشحن بنجاح");
    } else {
      showToast("error", error);
    }
  };

  // ... (الكود الخاص بحالات التحميل والخطأ والفراغ يبقى كما هو) ...
  if (loading && !chargeRequest) {
    return (
      <div className="p-4 sm:p-6 md:p-8 bg-slate-50 dark:bg-gray-900 min-h-screen">
        <Skeleton className="h-10 w-1/2 mb-6 md:mb-8" /> {/* Header Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <Skeleton className="h-48 rounded-xl" />
            <Skeleton className="h-72 rounded-xl" />
          </div>
          <div className="lg:col-span-1 space-y-6 md:space-y-8">
            <Skeleton className="h-56 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 md:p-8 bg-slate-50 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center text-center">
        <HiOutlineExclamationCircle size={56} className="text-red-500 mb-4" />
        <h2 className="text-xl md:text-2xl font-semibold text-red-600 dark:text-red-400 mb-2">
          خطأ في تحميل البيانات
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          لم نتمكن من تحميل تفاصيل الطلب. يرجى المحاولة مرة أخرى.
        </p>
        <Button
          color="primary"
          theme={flowbit.button}
          onClick={() =>
            fetchChargeRequest(() => globalApi.getChargeRequestById(id))
          }
          className="mt-6"
        >
          إعادة المحاولة
        </Button>
      </div>
    );
  }

  if (!chargeRequest) {
    return (
      <div className="p-4 sm:p-6 md:p-8 bg-slate-50 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center text-center">
        <FaQuestionCircle size={56} className="text-slate-400 mb-4" />
        <h2 className="text-xl md:text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-2">
          لم يتم العثور على الطلب
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          قد يكون المعرف غير صحيح أو أن الطلب قد تم حذفه.
        </p>
        <Link to="/dashboard/admin-wallet">
          <Button color="primary" className="mt-6" theme={flowbit.button}>
            العودة إلى قائمة الطلبات
          </Button>
        </Link>
      </div>
    );
  }

  const statusInfo = getStatusDisplayInfo(chargeRequest.status);
  const customerName =
    `${chargeRequest.user?.fullName?.first || ""} ${
      chargeRequest.user?.fullName?.second || ""
    }`.trim() || "غير معروف";
  const customerImage = parseImgUrl(chargeRequest.user?.profileImage);

  return (
    <div className="p-4 sm:p-6 md:p-8  dark:bg-gray-950 min-h-screen">
      <DashPageHeader
        Icon={FaWallet}
        title={`تفاصيل طلب الشحن #${chargeRequest.chargeRequestId}`}
        description="مراجعة تفاصيل الطلب واتخاذ الإجراء المناسب."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8">
        {/* ... (كود العمود الرئيسي وعمود معلومات العميل يبقى كما هو في الرد السابق) ... */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 space-y-6 md:space-y-8"
        >
          <CardContainer title="معلومات الطلب">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
              <DetailItem
                icon={FaReceipt}
                label="رقم الطلب"
                value={`#${chargeRequest.chargeRequestId}`}
                valueClassName="font-mono text-primaryColor dark:text-primary-300"
              />
              <DetailItem
                icon={FaRegCalendarAlt}
                label="تاريخ الطلب"
                value={formatDateTime(chargeRequest.createdAt, "both")}
              />
              <DetailItem
                icon={FaMoneyBillWave}
                label="المبلغ المشحون"
                value={`${chargeRequest.amount || 0} دج`}
                valueClassName="text-green-600 dark:text-green-400 font-bold"
              />
              <DetailItem
                icon={FaInfoCircle}
                label="طريقة الدفع"
                value={chargeRequest.paymentMethod || "غير محددة"}
              />
              <DetailItem
                icon={FaRegClock}
                label="تاريخ التحويل"
                value={formatDateTime(chargeRequest.transferDate, "both")}
              />
              <DetailItem
                icon={FaPaperclip}
                label="رقم الوصل/المعاملة"
                value={chargeRequest.transactionId || "لم يتم إرفاقه"}
              />
              <div className="sm:col-span-2">
                <DetailItem
                  icon={statusInfo.icon}
                  label="حالة الطلب"
                  value={
                    <Badge
                      color={statusInfo.color}
                      theme={flowbit.badge}
                      className="!text-sm !font-medium !px-2.5 !py-1 w-fit"
                    >
                      {statusInfo.text}
                    </Badge>
                  }
                />
              </div>
            </div>
          </CardContainer>

          <CardContainer title="إثبات الدفع المقدم">
            {chargeRequest.receiptUrl ? (
              <div className="text-center">
                <img
                  src={parseImgUrl(chargeRequest.receiptUrl)}
                  alt="إثبات الدفع"
                  className="max-w-full h-auto max-h-[350px] sm:max-h-[400px] md:max-h-[450px] rounded-lg shadow-md mx-auto border border-slate-200 dark:border-slate-700 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setShowProofModal(true)}
                />
                <Button
                  color="gray"
                  size="sm"
                  theme={flowbit.button}
                  onClick={() => setShowProofModal(true)}
                  className="mt-4 group !font-medium"
                >
                  <ZoomIn
                    size={18}
                    className="ml-2 text-primaryColor dark:text-primary-400 group-hover:scale-110 transition-transform"
                  />
                  عرض الصورة بحجم أكبر
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-10 text-slate-500 dark:text-slate-400">
                <FaPaperclip size={32} className="mb-3" />
                <p>لم يتم إرفاق صورة إثبات الدفع لهذا الطلب.</p>
              </div>
            )}
          </CardContainer>

          {chargeRequest.status === "rejected" &&
            chargeRequest.rejectionReason && (
              <CardContainer title="سبب رفض الطلب">
                <p className="text-md text-red-600 dark:text-red-400 whitespace-pre-line leading-relaxed">
                  {chargeRequest.rejectionReason}
                </p>
              </CardContainer>
            )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1 space-y-6 md:space-y-8"
        >
          <CardContainer title="معلومات العميل">
            <div className="flex flex-col items-center sm:items-start sm:flex-row gap-4 mb-4">
              <img
                src={
                  customerImage ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    customerName
                  )}&background=048CFF&color=fff&font-size=0.5&bold=true`
                }
                alt={customerName}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-primary-200 dark:border-primary-600 shadow-sm"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    customerName
                  )}&background=048CFF&color=fff&font-size=0.5&bold=true`;
                }}
              />
              <div className="text-center sm:text-start pt-1 sm:pt-2">
                <h4 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">
                  {customerName}
                </h4>
                {chargeRequest.user?.role && (
                  <Badge
                    color={
                      chargeRequest.user.role === "doctor"
                        ? "info"
                        : chargeRequest.user.role === "patient"
                        ? "success"
                        : "gray"
                    }
                    className="mt-1.5 !text-xs !font-medium w-fit"
                    theme={flowbit.badge}
                  >
                    {chargeRequest.user.role === "doctor"
                      ? "طبيب"
                      : chargeRequest.user.role === "patient"
                      ? "مريض"
                      : "غير محدد"}
                  </Badge>
                )}
              </div>
            </div>
            <div className="space-y-2.5 border-t border-slate-200 dark:border-slate-700 pt-4">
              <DetailItem
                icon={FaRegEnvelope}
                label="البريد الإلكتروني"
                value={chargeRequest.user?.email}
                valueClassName="break-all"
              />
              <DetailItem
                icon={FaWallet}
                label="رقم الهاتف"
                value={chargeRequest.user?.phone || "غير متوفر"}
              />
            </div>
          </CardContainer>

          {chargeRequest.status === "pending" && (
            <CardContainer title="اتخاذ إجراء">
              <div className="space-y-3">
                <Button
                  color="green"
                  onClick={handleApprove}
                  isProcessing={approveLoading} // تفعيل حالة التحميل
                  disabled={approveLoading} // تعطيل الزر أثناء التحميل
                  className="w-full !font-semibold group !py-2.5 md:!py-3"
                  theme={flowbit.button}
                >
                  <FaCheckCircle
                    size={18}
                    className="ml-2 group-hover:scale-110 transition-transform"
                  />
                  قبول طلب الشحن
                </Button>
                <Button
                  color="red"
                  onClick={() => {
                    setShowRejectModal(true);
                  }}
                  isProcessing={rejectLoading} // استخدام نفس حالة التحميل أو إنشاء واحدة أخرى إذا أردت التمييز
                  disabled={rejectLoading}
                  className="w-full !font-semibold group !py-2.5 md:!py-3"
                  theme={flowbit.button}
                >
                  <FaTimesCircle
                    size={18}
                    className="ml-2 group-hover:rotate-12 transition-transform"
                  />
                  رفض طلب الشحن
                </Button>
              </div>
            </CardContainer>
          )}
        </motion.div>
      </div>

      {/* نافذة عرض إثبات الدفع (تبقى كما هي) */}
      <Modal
        show={showProofModal}
        onClose={() => setShowProofModal(false)}
        size="2xl"
        theme={flowbit.modal}
      >
        <ModalHeader className="!px-5 !py-3.5">إثبات عملية الدفع</ModalHeader>
        <ModalBody className="p-2 sm:p-3 bg-slate-50 dark:bg-slate-900">
          <img
            src={parseImgUrl(chargeRequest?.receiptUrl)}
            alt="إثبات الدفع - مكبر"
            className="w-full h-auto max-h-[85vh] object-contain rounded-md"
          />
        </ModalBody>
        <ModalFooter className="!px-5 !py-3 justify-end">
          <Button
            color="gray"
            onClick={() => setShowProofModal(false)}
            theme={flowbit.button}
            className="!font-medium"
          >
            إغلاق
          </Button>
        </ModalFooter>
      </Modal>

      {/* نافذة إدخال سبب الرفض (تعديل disabled للزر) */}
      <Modal
        show={showRejectModal}
        onClose={() => {
          setShowRejectModal(false);
        }}
        size="md"
        popup
        theme={flowbit.modal}
      >
        <ModalHeader className="!px-5 !py-3.5" />
        <ModalBody className="p-5 sm:p-6">
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-3 h-12 w-12 text-red-500 dark:text-red-400" />
            <h3 className="mb-4 text-lg font-semibold text-slate-700 dark:text-white">
              هل أنت متأكد من رفض طلب الشحن هذا؟
            </h3>
            <div className="mb-4">
              <Label
                htmlFor="rejectionReason"
                value="سبب الرفض (إلزامي)"
                className="mb-1.5 block text-sm text-slate-700 dark:text-slate-300 text-start"
              />
              <Textarea
                id="rejectionReason"
                placeholder="أدخل سبب رفض الطلب هنا..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                required
                rows={3}
                className="!text-sm dark:!bg-slate-700 dark:!text-slate-200 dark:!border-slate-600 focus:!border-primary focus:!ring-primary dark:focus:!border-primary-400 dark:focus:!ring-primary-400"
                theme={flowbit.textarea}
              />
            </div>
            <div className="flex justify-center gap-3">
              <Button
                color="red"
                onClick={handleReject}
                isProcessing={rejectLoading}
                disabled={rejectLoading || !rejectionReason.trim()} // تفعيل التعطيل بناءً على السبب والتحميل
                theme={flowbit.button}
                className="!font-semibold"
              >
                نعم، تأكيد الرفض
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  setShowRejectModal(false);
                }}
                disabled={rejectLoading} // تعطيل زر الإلغاء أثناء التحميل
                theme={flowbit.button}
                className="!font-semibold"
              >
                إلغاء
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
