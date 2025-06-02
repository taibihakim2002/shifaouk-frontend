import React, { useEffect, useState } from "react";
import { IoDocumentText, IoVideocam } from "react-icons/io5";
import DashPageHeader from "../../../components/dashboard/common/DashPageHeader";
import { BsFillCalendarDateFill } from "react-icons/bs";
import {
  Button,
  Label,
  Select,
  TextInput,
  Tooltip,
  Textarea,
} from "flowbite-react";
import flowbit from "../../../config/flowbit";
import { Filter, Search } from "lucide-react";
import { MdAccessTimeFilled, MdCalendarToday } from "react-icons/md";
import {
  FaFilter,
  FaPlus,
  FaRegUserCircle,
  FaSave,
  FaTrashAlt,
  FaRegClock,
  FaRegStickyNote,
} from "react-icons/fa";
import { IoIosVideocam } from "react-icons/io";
import useApiRequest from "../../../hooks/useApiRequest";
import globalApi from "../../../utils/globalApi";
import useAuthStore from "../../../store/authStore";
import useToastStore from "../../../store/toastStore";
import { HiCurrencyDollar } from "react-icons/hi";

const daysOfWeek = [
  { key: "sun", label: "الأحد" },
  { key: "mon", label: "الإثنين" },
  { key: "tue", label: "الثلاثاء" },
  { key: "wed", label: "الأربعاء" },
  { key: "thu", label: "الخميس" },
  { key: "fri", label: "الجمعة" },
  { key: "sat", label: "السبت" },
];

const durationOptions = [
  { value: 15, label: "15 دقيقة" },
  { value: 30, label: "30 دقيقة" },
  { value: 45, label: "45 دقيقة" },
  { value: 60, label: "ساعة واحدة (60 دقيقة)" },
  { value: 75, label: "ساعة وربع (75 دقيقة)" },
  { value: 90, label: "ساعة ونصف (90 دقيقة)" },
];

export default function DoctorAppointments() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const { showToast } = useToastStore();
  const [availability, setAvailability] = useState([]);
  const [slotDuration, setSlotDuration] = useState(30);
  const [bookingNotes, setBookingNotes] = useState("");
  const [consultationPrice, setConsultationPrice] = useState();
  const { loading: setAvaLoading, request: setAvaRequest } = useApiRequest();

  useEffect(() => {
    if (user?.doctorProfile) {
      if (user.doctorProfile.availability) {
        setAvailability(user.doctorProfile.availability);
      }
      if (user.doctorProfile.slotDurationInMinutes) {
        setSlotDuration(user.doctorProfile.slotDurationInMinutes);
      }
      if (user.doctorProfile.bookingInstructions) {
        setBookingNotes(user.doctorProfile.bookingInstructions);
      }
      if (user.doctorProfile.consultationPrice) {
        setConsultationPrice(user.doctorProfile.consultationPrice);
      }
    }
  }, [user]);

  const handleAdd = () => {
    setAvailability([...availability, { day: "", from: "", to: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...availability];
    updated[index][field] = value;
    setAvailability(updated);
  };

  const handleDelete = (index) => {
    const updated = [...availability];
    updated.splice(index, 1);
    setAvailability(updated);
  };

  const handleSubmit = async () => {
    const dataToSubmit = {
      availability: availability,
      slotDurationInMinutes: Number(slotDuration),
      bookingInstructions: bookingNotes,
      consultationPrice: Number(consultationPrice),
    };

    const {
      success,
      data,
      error: requestError,
    } = await setAvaRequest(() =>
      globalApi.setDoctorAvailability(user._id, dataToSubmit)
    );

    if (success) {
      showToast("success", "تم حفظ الإعدادات والأوقات بنجاح");
      if (data && data.data) {
        setUser(data.data);
      } else if (data) {
        setUser(data);
      }
    } else {
      showToast("error", requestError);
    }
  };

  return (
    <div>
      <DashPageHeader
        Icon={IoDocumentText}
        title="إدارة التوفر والمواعيد"
        description="قم بتحديد أوقات العمل، مدة الجلسات، وإضافة ملاحظات للحجوزات."
      />

      <div className="border rounded-lg p-10 flex items-center gap-8 jus flex-col md:flex-row mb-10">
        <div className="flex flex-col md:flex-row w-full items-center gap-5">
          <div className="flex flex-col gap-2 w-full md:w-44" dir="rtl">
            <div className="flex flex-col gap-2 w-full md:w-44" dir="rtl">
              <Label htmlFor="cities" className="flex items-center gap-2">
                <span>
                  <MdCalendarToday />
                </span>
                <span>اليوم</span>
              </Label>
              <select
                className="w-full border p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
                id="cities"
                required
                defaultValue=""
              >
                <option value="">اختر اليوم</option>
                <option>اليوم</option>
                <option>امس</option>
                <option>هذا الاسبوع</option>
                <option>هذا الشهر</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-44" dir="rtl">
            <Label htmlFor="cities" className="flex items-center gap-2">
              <span>
                <FaFilter />
              </span>
              <span>الحالة</span>
            </Label>
            <select
              className="w-full border p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
              id="cities"
              required
              defaultValue=""
            >
              <option value="">الحالة</option>
              <option>مكتملة</option>
              <option>معلقة</option>
              <option>مؤكدة</option>
              <option>مرفوضة </option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full md:max-w-[500px]">
          <Label htmlFor="cities" className="flex items-center gap-2">
            البحث عن مريض
          </Label>
          <TextInput
            theme={flowbit.input}
            color="primary"
            className="w-full "
            id="search"
            type="text"
            rightIcon={Search}
            placeholder="ابحث عن طبيب..."
            required
          />
        </div>
      </div>
      <div className="border rounded-lg p-10 mb-10">
        <h3 className="text-lg font-bold text-gray-600 mb-10">المواعيد</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="w-full border rounded-lg p-5">
            <div className="flex justify-between items-center gap-3 mb-3">
              <div className="flex items-center gap-3">
                <img
                  src="/doctor1.jpg"
                  alt="doctor"
                  className="w-20 h-20 object-cover rounded-full"
                />
                <div>
                  <h3 className="text-gray-600 font-bold mb-2">بن علي علي</h3>
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-full border border-primaryColor">
                      <IoVideocam size={14} className="text-primaryColor" />
                    </span>
                    <span className="text-sm text-gray-400">
                      استشارة عن بعد
                    </span>
                  </div>
                </div>
              </div>
              <p className="py-2 text-sm px-3 text-[#25A85C] bg-[#c1ffdb]  rounded-lg">
                {" "}
                مؤكدة
              </p>
            </div>
            <div className="flex items-center gap-6 text-gray-500 mb-3">
              <div className="flex items-center gap-2">
                <MdAccessTimeFilled className="text-primaryColor" />
                <p>5:00 - 5:30 مساءً</p>
              </div>

              <div className="flex items-center gap-2">
                <BsFillCalendarDateFill className="text-primaryColor" />
                <p>اليوم</p>
              </div>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <Button theme={flowbit.button} color="primary" size="sm">
                <span className="me-2">
                  <IoIosVideocam />
                </span>
                <span>بدأ الجلسة</span>
              </Button>

              <Button theme={flowbit.button} color="light" size="sm">
                <span className="me-2">
                  <MdAccessTimeFilled />
                </span>
                <span>تأجيل </span>
              </Button>

              <Button theme={flowbit.button} color="light" size="sm">
                <span className="me-2">
                  <FaRegUserCircle />
                </span>
                <span>الملف الشخصي </span>
              </Button>
            </div>
          </div>
          <div className="w-full border rounded-lg p-5">
            <div className="flex justify-between items-center gap-3 mb-3">
              <div className="flex items-center gap-3">
                <img
                  src="/doctor1.jpg"
                  alt="doctor"
                  className="w-20 h-20 object-cover rounded-full"
                />
                <div>
                  <h3 className="text-gray-600 font-bold mb-2">بن علي علي</h3>
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-full border border-primaryColor">
                      <IoVideocam size={14} className="text-primaryColor" />
                    </span>

                    <span className="text-sm text-gray-400">
                      استشارة عن بعد
                    </span>
                  </div>
                </div>
              </div>

              <p className="py-2 text-sm px-3 text-[#25A85C] bg-[#c1ffdb]  rounded-lg">
                مؤكدة
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-3">
              <div className="flex items-center gap-2">
                <MdAccessTimeFilled className="text-primaryColor" />
                <p>5:00 - 5:30 مساءً</p>
              </div>

              <div className="flex items-center gap-2">
                <BsFillCalendarDateFill className="text-primaryColor" />
                <p>اليوم</p>
              </div>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <Button theme={flowbit.button} color="primary" size="sm">
                <span className="me-2">
                  <IoIosVideocam />
                </span>
                <span>بدأ الجلسة</span>
              </Button>

              <Button theme={flowbit.button} color="light" size="sm">
                <span className="me-2">
                  <MdAccessTimeFilled />
                </span>
                <span>تأجيل </span>
              </Button>

              <Button theme={flowbit.button} color="light" size="sm">
                <span className="me-2">
                  <FaRegUserCircle />
                </span>
                <span>الملف الشخصي </span>
              </Button>
            </div>
          </div>

          <div className="w-full border rounded-lg p-5">
            <div className="flex justify-between items-center gap-3 mb-3">
              <div className="flex items-center gap-3">
                <img
                  src="/doctor1.jpg"
                  alt="doctor"
                  className="w-20 h-20 object-cover rounded-full"
                />

                <div>
                  <h3 className="text-gray-600 font-bold mb-2">بن علي علي</h3>

                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-full border border-primaryColor">
                      <IoVideocam size={14} className="text-primaryColor" />
                    </span>

                    <span className="text-sm text-gray-400">
                      استشارة عن بعد
                    </span>
                  </div>
                </div>
              </div>

              <p className="py-2 text-sm px-3 text-[#25A85C] bg-[#c1ffdb]  rounded-lg">
                مؤكدة
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-3">
              <div className="flex items-center gap-2">
                <MdAccessTimeFilled className="text-primaryColor" />
                <p>5:00 - 5:30 مساءً</p>
              </div>

              <div className="flex items-center gap-2">
                <BsFillCalendarDateFill className="text-primaryColor" />
                <p>اليوم</p>
              </div>
            </div>

            <div className="flex gap-2 items-center justify-center">
              <Button theme={flowbit.button} color="primary" size="sm">
                <span className="me-2">
                  <IoIosVideocam />
                </span>
                <span>بدأ الجلسة</span>
              </Button>

              <Button theme={flowbit.button} color="light" size="sm">
                <span className="me-2">
                  <MdAccessTimeFilled />
                </span>
                <span>تأجيل </span>
              </Button>

              <Button theme={flowbit.button} color="light" size="sm">
                <span className="me-2">
                  <FaRegUserCircle />
                </span>
                <span>الملف الشخصي </span>
              </Button>
            </div>
          </div>

          <div className="w-full border rounded-lg p-5">
            <div className="flex justify-between items-center gap-3 mb-3">
              <div className="flex items-center gap-3">
                <img
                  src="/doctor1.jpg"
                  alt="doctor"
                  className="w-20 h-20 object-cover rounded-full"
                />

                <div>
                  <h3 className="text-gray-600 font-bold mb-2">بن علي علي</h3>

                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-full border border-primaryColor">
                      <IoVideocam size={14} className="text-primaryColor" />
                    </span>

                    <span className="text-sm text-gray-400">
                      استشارة عن بعد
                    </span>
                  </div>
                </div>
              </div>

              <p className="py-2 text-sm px-3 text-[#25A85C] bg-[#c1ffdb]  rounded-lg">
                مؤكدة
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-3">
              <div className="flex items-center gap-2">
                <MdAccessTimeFilled className="text-primaryColor" />
                <p>5:00 - 5:30 مساءً</p>
              </div>

              <div className="flex items-center gap-2">
                <BsFillCalendarDateFill className="text-primaryColor" />
                <p>اليوم</p>
              </div>
            </div>

            <div className="flex gap-2 items-center justify-center">
              <Button theme={flowbit.button} color="primary" size="sm">
                <span className="me-2">
                  <IoIosVideocam />
                </span>
                <span>بدأ الجلسة</span>
              </Button>

              <Button theme={flowbit.button} color="light" size="sm">
                <span className="me-2">
                  <MdAccessTimeFilled />
                </span>
                <span>تأجيل </span>
              </Button>

              <Button theme={flowbit.button} color="light" size="sm">
                <span className="me-2">
                  <FaRegUserCircle />
                </span>
                <span>الملف الشخصي </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-3xl mx-auto my-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-sky-700 dark:text-sky-400 mb-6 text-center">
          تحديد أوقات العمل وإعدادات الحجز
        </h3>

        {/* Slot Duration and Booking Notes Section */}
        <div className="grid grid-cols-1 gap-6 mb-8 pb-6 border-b dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1">
              <Label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <HiCurrencyDollar className="inline ms-2 text-sky-600 dark:text-sky-400" />
                سعر الاستشارة (دج)
              </Label>
              <TextInput
                type="number"
                defaultValue={consultationPrice}
                placeholder="ادخل سعر الاستشارة (دج)"
                onChange={(e) => setConsultationPrice(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Label
                htmlFor="slotDuration"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <FaRegClock className="inline ms-2 text-sky-600 dark:text-sky-400" />
                مدة الاستشارة/تقسيم الحصة
              </Label>
              <Select
                id="slotDuration"
                value={slotDuration}
                onChange={(e) => setSlotDuration(parseInt(e.target.value, 10))}
                theme={flowbit.select} // Assuming you have a select theme
                className="w-full text-right [&_select]:dark:bg-gray-700 [&_select]:dark:text-white [&_select]:text-right [&_select]:pr-10"
                required
              >
                {durationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <Label
              htmlFor="bookingNotes"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <FaRegStickyNote className="inline ms-2 text-sky-600 dark:text-sky-400" />
              ملاحظات إضافية لعملية الحجز
            </Label>
            <Textarea
              id="bookingNotes"
              value={bookingNotes}
              onChange={(e) => setBookingNotes(e.target.value)}
              placeholder="مثال: يرجى الحضور قبل الموعد بـ 10 دقائق..."
              rows={3}
              theme={flowbit.textarea} // Assuming you have a textarea theme
              className="w-full dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Availability Time Slots Section */}
        {availability.length === 0 &&
          !setAvaLoading && ( // Added !setAvaLoading to prevent flash of empty state during load
            <div className="text-center py-10 px-6 bg-slate-50 dark:bg-gray-700/50 rounded-lg shadow-inner">
              <MdAccessTimeFilled
                className="mx-auto text-5xl text-primaryColor dark:text-gray-500 mb-4" // Assuming primaryColor is defined
                // size={22} // text-5xl is usually sufficient
              />
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-4 text-gray-400">
                لم تقم بإضافة أي أوقات عمل حتى الآن.
              </p>
              <Button
                theme={flowbit.button}
                color="primary"
                outline
                onClick={handleAdd}
                className="mx-auto group"
                disabled={setAvaLoading}
              >
                <FaPlus className="ms-2 transition-transform duration-300 ease-out group-hover:rotate-90" />
                إضافة أول توقيت
              </Button>
            </div>
          )}

        {availability.length > 0 && (
          <div className="flex flex-col gap-6">
            {availability.map((slot, index) => (
              <div
                key={index}
                className="bg-slate-50 dark:bg-gray-700/60 p-5 rounded-lg shadow-md border border-slate-200 dark:border-gray-600 transition-all hover:shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,_3fr)_minmax(0,_2fr)_minmax(0,_2fr)_auto] gap-4 items-end">
                  <div>
                    <Label
                      htmlFor={`day-${index}`}
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      اليوم
                    </Label>
                    <Select
                      id={`day-${index}`}
                      value={slot.day}
                      onChange={(e) =>
                        handleChange(index, "day", e.target.value)
                      }
                      theme={flowbit.select}
                      className="w-full text-right [&_select]:dark:bg-gray-700 [&_select]:dark:text-white [&_select]:text-right [&_select]:pr-10"
                      required
                    >
                      <option value="">اختر يوماً</option>
                      {daysOfWeek.map((day) => (
                        <option key={day.key} value={day.key}>
                          {day.label}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor={`start-time-${index}`}
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      من
                    </Label>
                    <TextInput
                      id={`start-time-${index}`}
                      type="time"
                      value={slot.from}
                      onChange={(e) =>
                        handleChange(index, "from", e.target.value)
                      }
                      icon={MdAccessTimeFilled}
                      theme={flowbit.input}
                      className="[&_input]:dark:bg-gray-700 [&_input]:dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor={`end-time-${index}`}
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      إلى
                    </Label>
                    <TextInput
                      id={`end-time-${index}`}
                      type="time"
                      value={slot.to}
                      onChange={(e) =>
                        handleChange(index, "to", e.target.value)
                      }
                      icon={MdAccessTimeFilled}
                      theme={flowbit.input}
                      className="[&_input]:dark:bg-gray-700 [&_input]:dark:text-white"
                      required
                    />
                  </div>

                  <div className="text-left">
                    <Tooltip content="حذف هذا التوقيت" placement="top">
                      <Button
                        theme={flowbit.button}
                        color="noColor" // Ensure this color is defined in your theme or use 'light' etc.
                        className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-red-100 dark:hover:bg-red-800/70 hover:text-red-700 dark:hover:text-red-100 focus:ring-red-300 dark:focus:ring-red-700 p-2.5"
                        onClick={() => handleDelete(index)}
                        aria-label="حذف التوقيت"
                        disabled={setAvaLoading}
                      >
                        <FaTrashAlt className="h-5 w-5 text-red-700" />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-gray-600">
          {availability.length > 0 && (
            <Button
              theme={flowbit.button}
              onClick={handleAdd}
              outline
              color="primary"
              className="flex gap-2 sm:w-auto group items-center justify-center" // Added items-center justify-center
              disabled={setAvaLoading}
            >
              <FaPlus className="ms-2 transition-transform duration-300 ease-out group-hover:scale-110" />
              <span>إضافة توقيت آخر</span>
            </Button>
          )}
          <Button
            theme={flowbit.button}
            color="primary"
            onClick={handleSubmit}
            className="flex gap-2 group items-center justify-center" // Added items-center justify-center
            isProcessing={setAvaLoading} // Use isProcessing for loading state
            disabled={setAvaLoading}
          >
            <FaSave className="ms-2 transition-transform duration-300 ease-out group-hover:scale-110" />
            <span>حفظ الإعدادات والأوقات</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
