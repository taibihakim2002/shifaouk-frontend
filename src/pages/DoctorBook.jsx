import {
  Button,
  Datepicker,
  FileInput,
  Label,
  Spinner,
  Textarea,
} from "flowbite-react";
import flowbit from "../config/flowbit";
import {
  HiMiniDocumentPlus,
  HiCheckCircle,
  HiOutlineArrowLeft,
  HiOutlineWallet,
} from "react-icons/hi2"; // تم إضافة أيقونات
import { useEffect, useState } from "react";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineUserCircle,
  HiOutlineVideoCamera,
} from "react-icons/hi";
import useApiRequest from "../hooks/useApiRequest";
import globalApi from "../utils/globalApi";
import { Link, useParams } from "react-router-dom";
import parseImgUrl from "../utils/parseImgUrl";
import Loading from "../components/common/Loading";
import { BiCloset } from "react-icons/bi";
import { IoMdCloseCircle, IoMdTime } from "react-icons/io";
import formatDateTime from "../utils/formatDateTime";
import Skeleton from "../components/common/Skeleton";
import useAuthStore from "../store/authStore";
import useToastStore from "../store/toastStore";
import { IoTime } from "react-icons/io5";

const DoctorProfileCard = ({ doctor }) => (
  <div className="lg:w-1/3">
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex flex-col items-center mb-4">
        <div className=" bg-gray-300 rounded-full mb-3 flex items-center justify-center">
          <img
            src={parseImgUrl(doctor.profileImage)}
            alt="doctor"
            className="w-32 h-32 object-cover rounded-full"
          />
        </div>
        <h3 className="text-xl font-semibold">
          {doctor?.fullName?.first} {doctor?.fullName?.second}
        </h3>
        <p className="text-blue-600 mb-1">
          استشاري {doctor?.doctorProfile?.specialization}
        </p>
        <p className="text-sm text-gray-500 mb-2">
          {doctor?.state}-{doctor?.city}
        </p>
        <div className="flex items-center">
          <span className="text-yellow-500">★</span>
          <span className="ml-1 font-semibold">
            {doctor?.doctorProfile?.rating}
          </span>
          <span className="ml-2 text-gray-500 text-sm">
            ({doctor?.doctorProfile?.totalReviews} تقييم)
          </span>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="font-semibold mb-2 text-md">نبذة عن الطبيب</h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          {doctor?.doctorProfile?.doctorBio}
        </p>
      </div>
      <Link
        to={`/doctors/${doctor?._id}`}
        className="w-full flex justify-center bg-blue-500 text-white py-2.5 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        زيارة الملف الشخصي
      </Link>
    </div>
  </div>
);

export default function DoctorBook() {
  const user = useAuthStore((state) => state.user);
  const { showToast } = useToastStore();
  const { id } = useParams();
  const {
    data: doctorData,
    error: doctorError,
    loading: doctorLoading,
    request: doctorRequest,
  } = useApiRequest();

  const {
    data: slotsData,
    error: slotsError,
    loading: slotsLoading,
    request: slotsRequest,
  } = useApiRequest();

  const {
    data: balanceData,
    error: balanceError,
    loading: balanceLoading,
    request: balanceRequest,
  } = useApiRequest();

  const {
    data: bookData,
    error: bookError,
    loading: bookLoading,
    request: bookRequest,
  } = useApiRequest();

  useEffect(() => {
    doctorRequest(() => globalApi.getDoctorById(id));
    balanceRequest(() => globalApi.getMyBalance());
  }, []);

  const [step, setStep] = useState(1);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [errors, setErrors] = useState({});
  const [selectedDate, setChoosedDate] = useState(today);
  const [selectedSlote, setSelectedSlote] = useState();
  const [otherInfo, setOtherInfo] = useState();
  const [availableSlots, setAvailableSlots] = useState();

  useEffect(() => {
    slotsRequest(() => globalApi.getDoctorSlots(id, selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    setAvailableSlots(slotsData?.slots);
  }, [slotsData]);

  const [bookingDetails, setBookingDetails] = useState({
    // doctorName: "د.صخري معاذ",
    // consultationType: "استشارة عن بعد",
    // date: "الثلاثاء، 6 يونيو 2023",
    // time: "21:00",
    // totalAmount: "250 د.ط",
    // bookingId: "APT-20230606-1234",
    // rawConsultationDetails: {
    //   name: "استشارة عن بعد",
    //   duration: "30 دقيقة",
    //   cost: "250 دينار طبي",
    // },
  });

  const handleNext = () => {
    if (step == 1) {
      if (!selectedSlote) {
        return setErrors({ slote: "يجب اختيار التوقيت قبل المتابعة" });
      }
      setStep((pre) => pre + 1);
    }
  };
  const preStep = () => setStep((pre) => pre - 1);

  const handleConfirmBooking = async () => {
    const payload = {
      doctor: doctorData?.data?._id,
      patient: user._id,
      date: selectedSlote.time,
      type: "online",
      notes: otherInfo,
    };
    const { success, data, error } = await bookRequest(() =>
      globalApi.createConsultation(payload)
    );

    if (success) {
      setBookingDetails(data?.data);
      setStep(3);
    } else {
      showToast("error", error);
    }
  };

  const dayLabels = [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الاربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];

  if (doctorLoading) {
    return (
      <div className="w-full h-[calc(100vh-80px)]">
        <Loading />
      </div>
    );
  }
  if (doctorError) {
    return (
      <div className="w-full h-[calc(100vh-80px)] flex justify-center items-center">
        <p className="text-sm">حدث خطأ اثناء تحميل بيانات الطبيب </p>
      </div>
    );
  }
  return (
    <div>
      <div className="container mx-auto py-16 px-4">
        <h3 className="text-center text-gray-600 font-bold text-xl">
          حجز استشارة جديدة
        </h3>
        <div className="py-10 mb-5 flex justify-center">
          <div className="flex items-center relative">
            <h4
              className={`p-2 w-7 h-7 flex justify-center items-center text-white rounded-full bg-primaryColor text-sm z-10`}
            >
              1
            </h4>
            <span
              className={`w-16 md:w-32  h-[6px] bg-primaryColor -ms-2`}
            ></span>
            <h4
              className={`p-2 w-7 h-7 flex justify-center items-center text-white rounded-full ${
                step >= 2 ? "bg-primaryColor" : "bg-gray-500"
              } -ms-1 text-sm z-10`}
            >
              2
            </h4>
            <span
              className={`w-16  md:w-32 h-[6px] ${
                step >= 2 ? "bg-primaryColor" : "bg-gray-500"
              } -ms-2`}
            ></span>
            <h4
              className={`p-2 w-7 h-7 flex justify-center items-center text-white rounded-full ${
                step >= 3 ? "bg-primaryColor" : "bg-gray-500"
              } -ms-1 text-sm z-10`}
            >
              3
            </h4>
            <span
              className={`w-16  md:w-32 h-[6px] ${
                step >= 3 ? "bg-primaryColor" : "bg-gray-500"
              } -ms-2`}
            ></span>
            <h4
              className={`p-2 w-7 h-7 flex justify-center items-center text-white rounded-full ${
                step >= 4 ? "bg-primaryColor" : "bg-gray-500"
              } -ms-1 text-sm z-10`}
            >
              4
            </h4>
          </div>
        </div>
        {step === 1 && (
          <div className="flex flex-col lg:flex-row gap-8 ">
            {doctorData?.data && (
              <DoctorProfileCard doctor={doctorData?.data} />
            )}

            <div className="lg:w-2/3 border p-8 rounded-lg bg-white shadow">
              <div className="mb-8">
                <h2 className="font-bold text-gray-600 mb-3">
                  اختيار نوع الاستشارة:
                </h2>
                <div className="border border-blue-500 bg-blue-50 text-primaryColor p-4 rounded-lg shadow w-full max-w-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">استشارة عن بعد</h3>
                      <p className="text-sm">
                        {doctorData?.data?.doctorProfile?.slotDurationInMinutes}
                        دقيقة
                      </p>
                    </div>
                    <div className="text-lg font-semibold">
                      {doctorData?.data?.doctorProfile?.consultationPrice} دج{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="font-bold text-gray-600 mb-3">
                  اختر التاريخ والوقت المناسب:
                </h2>
                <div className="bg-white ">
                  <div dir="ltr" className="mb-6">
                    <Datepicker
                      inline
                      value={selectedDate}
                      language="ar"
                      minDate={today}
                      theme={flowbit.customThemeDatePicker}
                      weekStart={6}
                      onChange={(e) => setChoosedDate(e)}
                      showTodayButton={true}
                      labelTodayButton="اليوم"
                      labelClearButton="ازالة"
                      showClearButton={true}
                      dayNames={dayLabels}
                    />
                  </div>
                  <div className="mt-8">
                    <h3 className="font-bold mb-4 text-gray-600">
                      الأوقات المتاحة - {formatDateTime(selectedDate, "arabic")}{" "}
                      :
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {slotsLoading ? (
                        [0, 0, 0, 0, 0, 0].map((ele, index) => (
                          <Skeleton key={index} className="w-24 h-10" />
                        ))
                      ) : !availableSlots || availableSlots.length === 0 ? (
                        <div>
                          <p className="text-sm text-red-600 flex items-center gap-2">
                            <IoMdCloseCircle className="text-red-600" />
                            لا توجد أوقات متاحة هذا اليوم
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {availableSlots.map((slot, index) => {
                            const timeLabel = formatDateTime(slot.time, "time"); // مثال: 14:00
                            return (
                              <button
                                key={`${slot.time}-${index}`}
                                disabled={slot.isBooked}
                                onClick={() => {
                                  setSelectedSlote(slot);
                                }}
                                className={`text-sm py-2 px-4 rounded-lg transition-all duration-200
                ${
                  slot.isBooked
                    ? "bg-red-100 text-red-500 border border-red-300 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:bg-blue-500 focus:text-white"
                }
              `}
                              >
                                {timeLabel} {slot.isBooked ? " (محجوز)" : ""}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    {errors.slote && (
                      <p className="text-sm mt-5 text-red-600">
                        {errors.slote}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <div>
                  <h3 className="text-gray-600 font-bold mb-3">
                    معلومات اضافية:
                  </h3>
                  <Label
                    htmlFor="pio"
                    className="mb-2 block text-sm text-gray-500"
                  >
                    الأعراض أو الملاحظات (اختياري)
                  </Label>
                </div>
                <Textarea
                  id="notes"
                  value={otherInfo}
                  onChange={(e) => setOtherInfo(e.target.value)}
                  placeholder="اضف اي ملاحضات خاصة بهذا الموعد ..."
                  rows={4}
                />
              </div>

              <div className="flex flex-col gap-2 mb-8">
                <Label
                  htmlFor="file-upload-input"
                  className="text-gray-600 font-bold"
                >
                  سجلات طبية (اختياري)
                </Label>{" "}
                <Label
                  htmlFor="file-upload-input"
                  className={`flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600`} // إضافة bg-gray-50 و hover
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <HiMiniDocumentPlus
                      size={48}
                      className="text-primaryColor mb-3"
                    />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold"> اسحب الملف هنا </span> أو
                      اضغط للاختيار
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      يدعم ملفات PDF, PNG, JPG (الحد الأقصى: 2MB){" "}
                    </p>
                  </div>
                  <FileInput id="file-upload-input" className="hidden" />{" "}
                </Label>
              </div>
              <div className="flex justify-end">
                <Button
                  theme={flowbit.button}
                  color="primary"
                  onClick={handleNext}
                >
                  التالي <HiOutlineArrowLeft className="mr-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col lg:flex-row gap-8">
            {doctorData?.data && (
              <DoctorProfileCard doctor={doctorData?.data} />
            )}
            <div className="lg:w-2/3 border p-8 rounded-lg bg-white shadow space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  طريقة الدفع
                </h2>
                <div className="bg-white p-5 rounded-lg border border-primaryColor shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <HiOutlineWallet className="w-8 h-8 text-primaryColor" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 text-lg">
                        المحفظة الطبية
                      </h3>
                      {balanceLoading ? (
                        <Skeleton className="w-24 h-10" />
                      ) : (
                        balanceData && (
                          <p className="text-sm text-gray-500">
                            رصيدك الحالي هو: {balanceData?.data?.balance} د.ج
                          </p>
                        )
                      )}
                    </div>
                  </div>
                  <HiCheckCircle className="w-7 h-7 text-green-500" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  ملخص الحجز
                </h3>
                <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">
                      الطبيب:
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {doctorData?.data?.fullName?.first}{" "}
                      {doctorData?.data?.fullName?.second}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">
                      نوع الاستشارة:
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      عن بعد
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">
                      التاريخ:
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {formatDateTime(selectedSlote.time, "arabic")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">
                      الوقت:
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {formatDateTime(selectedSlote.time, "time")}
                    </span>
                  </div>
                  <hr className="my-4 border-gray-300" />{" "}
                  <div className="flex justify-between items-center">
                    <span className="text-md font-bold text-gray-700">
                      المجموع:
                    </span>
                    <span className="text-lg font-bold text-primaryColor">
                      {doctorData?.data?.doctorProfile?.consultationPrice} دج
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-5 space-y-4">
                <Button
                  theme={flowbit.button}
                  color="primary"
                  fullSized
                  onClick={handleConfirmBooking}
                  className="shadow-md hover:shadow-lg flex gap-2 items-center"
                  disabled={bookLoading}
                >
                  {bookLoading && <Spinner color="info" size="sm" />}
                  <span>تأكيد الحجز</span>
                </Button>
                <div className="flex justify-end">
                  <Button
                    theme={flowbit.button}
                    color="primary"
                    outline
                    onClick={preStep}
                  >
                    السابق{" "}
                    <HiOutlineArrowLeft className="mr-2 h-5 w-5 transform scale-x-[-1]" />{" "}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center max-w-[800px] m-auto rounded-lg justify-center text-center py-12 px-4 border">
            <HiCheckCircle className="w-20 h-20 md:w-24 md:h-24 text-blue-600 mb-6" />{" "}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              تم تأكيد حجزك بنجاح!
            </h1>
            <p className="text-gray-600 text-sm md:text-base mb-10">
              تم استلام طلبك بنجاح وسيتم مراجعته من طرف الطبيب
            </p>
            <div className="w-full max-w-2xl bg-gray-100 p-6 md:p-8 rounded-xl shadow-lg mb-10">
              <h2 className="text-xl font-semibold text-gray-700 mb-6 text-right">
                تفاصيل الحجز
              </h2>
              <div className="flex flex-col gap-4 text-right">
                <div className="flex justify-between items-center">
                  <span className="text-md text-gray-600">الطبيب:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-md font-medium text-gray-800">
                      {bookingDetails?.doctor?.fullName?.first}{" "}
                      {bookingDetails?.doctor?.fullName?.second}
                    </span>
                    <HiOutlineUserCircle className="w-6 h-6 text-gray-500" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-md text-gray-600">نوع الاستشارة: </span>
                  <div className="flex items-center gap-2">
                    <span className="text-md font-medium text-gray-800">
                      {/* !edit-here | يجب ان تجعل نوع الاستشارة ديناميكا عند وجود انواع اخرى */}
                      عن بعد
                    </span>
                    <HiOutlineVideoCamera className="w-6 h-6 text-gray-500" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-md text-gray-600">مدة الاستشارة: </span>
                  <div className="flex items-center gap-2">
                    <span className="text-md font-medium text-gray-800">
                      {bookingDetails?.duration} دقيقة
                    </span>
                    <IoMdTime className="w-6 h-6 text-gray-500" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-md text-gray-600">التاريخ:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-md font-medium text-gray-800">
                      {formatDateTime(bookingDetails?.date, "arabic")}
                    </span>
                    <HiOutlineCalendar className="w-6 h-6 text-gray-500" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-md text-gray-600">الوقت:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-md font-medium text-gray-800">
                      {formatDateTime(bookingDetails?.date, "time")}
                    </span>
                    <HiOutlineClock className="w-6 h-6 text-gray-500" />
                  </div>
                </div>
              </div>
              <hr className="my-6 border-gray-300" />
              <div className="text-right mb-3">
                <span className="text-md font-semibold text-gray-600">
                  المجموع المدفوع:{" "}
                </span>
                <span className="text-lg font-bold text-blue-600">
                  {bookingDetails?.price} دج
                </span>
              </div>
              <p className="text-sm text-gray-500 text-center">
                رقم الحجز: {bookingDetails?.consultationId}#
              </p>
            </div>
            <div className="w-full px-10 mb-10">
              <h3 className="font-semibold text-gray-600 text-lg mb-6 text-right">
                الخطوات التالية:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-100 rounded-full mb-4">
                    <HiOutlineClock className="w-10 h-10 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    انضم مبكرًا
                  </h4>
                  <p className="text-sm text-gray-600">
                    ادخل إلى غرفة الانتظار قبل 5 دقائق من الموعد
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-100 rounded-full mb-4">
                    <HiOutlineDocumentText className="w-10 h-10 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    جهز مستنداتك
                  </h4>
                  <p className="text-sm text-gray-600">
                    دقق أسئلتك وأعراضك لمناقشتها مع الطبيب
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-100 rounded-full mb-4">
                    <HiOutlineVideoCamera className="w-10 h-10 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    تجهيز الاتصال
                  </h4>
                  <p className="text-sm text-gray-600">
                    تأكد من جودة الانترنت والكاميرا والميكروفون قبل الموعد
                  </p>
                </div>
              </div>
            </div>
            <Button
              theme={flowbit.button}
              color="primary"
              className="min-w-[250px] shadow-lg"
            >
              الانتقال الى الصفحة الرئيسية
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
