import { FaCheck, FaCircleCheck, FaUserDoctor } from "react-icons/fa6";
import Logo from "../components/common/Logo";
import { FaRegCalendarCheck, FaRegCheckCircle, FaUser } from "react-icons/fa";
import { MdEmail, MdOutlineSecurity } from "react-icons/md";
import { useState } from "react";
import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { Phone } from "lucide-react";
import flowbit from "../config/flowbit";
import { BsCamera } from "react-icons/bs";
import { HiMiniDocumentPlus } from "react-icons/hi2";
import { IoDocumentTextOutline, IoHelpCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const stats = [
  { id: 1, name: "أدرار" },
  { id: 2, name: "الشلف" },
  { id: 3, name: "الأغواط" },
  { id: 4, name: "أم البواقي" },
  { id: 5, name: "باتنة" },
  { id: 6, name: "بجاية" },
  { id: 7, name: "بسكرة" },
  { id: 8, name: "بشار" },
  { id: 9, name: "البليدة" },
  { id: 10, name: "البويرة" },
  { id: 11, name: "تمنراست" },
  { id: 12, name: "تبسة" },
  { id: 13, name: "تلمسان" },
  { id: 14, name: "تيارت" },
  { id: 15, name: "تيزي وزو" },
  { id: 16, name: "الجزائر" },
  { id: 17, name: "الجلفة" },
  { id: 18, name: "جيجل" },
  { id: 19, name: "سطيف" },
  { id: 20, name: "سعيدة" },
  { id: 21, name: "سكيكدة" },
  { id: 22, name: "سيدي بلعباس" },
  { id: 23, name: "عنابة" },
  { id: 24, name: "قالمة" },
  { id: 25, name: "قسنطينة" },
  { id: 26, name: "المدية" },
  { id: 27, name: "مستغانم" },
  { id: 28, name: "المسيلة" },
  { id: 29, name: "معسكر" },
  { id: 30, name: "ورقلة" },
  { id: 31, name: "وهران" },
  { id: 32, name: "البيض" },
  { id: 33, name: "إليزي" },
  { id: 34, name: "برج بوعريريج" },
  { id: 35, name: "بومرداس" },
  { id: 36, name: "الطارف" },
  { id: 37, name: "تندوف" },
  { id: 38, name: "تيسمسيلت" },
  { id: 39, name: "الوادي" },
  { id: 40, name: "خنشلة" },
  { id: 41, name: "سوق أهراس" },
  { id: 42, name: "تيبازة" },
  { id: 43, name: "ميلة" },
  { id: 44, name: "عين الدفلى" },
  { id: 45, name: "النعامة" },
  { id: 46, name: "عين تموشنت" },
  { id: 47, name: "غرداية" },
  { id: 48, name: "غليزان" },
  { id: 49, name: "تميمون" },
  { id: 50, name: "برج باجي مختار" },
  { id: 51, name: "أولاد جلال" },
  { id: 52, name: "بني عباس" },
  { id: 53, name: "عين صالح" },
  { id: 54, name: "عين قزام" },
  { id: 55, name: "تقرت" },
  { id: 56, name: "جانت" },
  { id: 57, name: "المغير" },
  { id: 58, name: "المنيعة" },
];

const spec = [
  { label: "الطب العام", value: "general_medicine" },
  { label: "طب الأطفال", value: "pediatrics" },
  { label: "أمراض النساء والتوليد", value: "gynecology_obstetrics" },
  { label: "طب العيون", value: "ophthalmology" },
  { label: "طب الأسنان", value: "dentistry" },
  { label: "الأمراض الجلدية", value: "dermatology" },
  { label: "طب القلب", value: "cardiology" },
  { label: "طب الأنف والأذن والحنجرة", value: "ent" },
  { label: "طب الأعصاب", value: "neurology" },
  { label: "جراحة العظام والمفاصل", value: "orthopedic_surgery" },
  { label: "الجراحة العامة", value: "general_surgery" },
  { label: "جراحة الأعصاب", value: "neurosurgery" },
  { label: "جراحة القلب والشرايين", value: "cardiovascular_surgery" },
  { label: "الطب النفسي", value: "psychiatry" },
  { label: "الأورام", value: "oncology" },
  { label: "طب الكلى", value: "nephrology" },
  { label: "أمراض الجهاز الهضمي", value: "gastroenterology" },
  { label: "أمراض الدم", value: "hematology" },
  { label: "التخدير والإنعاش", value: "anesthesia" },
  { label: "الأشعة والتصوير الطبي", value: "radiology" },
  { label: "الطب الشرعي", value: "forensic_medicine" },
  { label: "أمراض الصدر والتنفس", value: "pulmonology" },
  { label: "الطب الرياضي", value: "sports_medicine" },
  { label: "الطب الوقائي والصحة العامة", value: "public_health" },
  { label: "العلاج الطبيعي وإعادة التأهيل", value: "physiotherapy" },
];

export default function NewDoctor() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((pre) => pre + 1);
  const preStep = () => setStep((pre) => pre - 1);
  return (
    <div>
      <div className="w-full flex items-center h-[80px]">
        <div className="container flex justify-between items-center pb-3 border-b border-b-gray-100">
          <Logo />
        </div>
      </div>
      <div className="container py-16 flex gap-5 flex-col lg:flex-row">
        <div className="w-full lg:w-2/3  order-2 lg:order-1 border rounded-lg shadow-md p-7">
          <h3 className="text-center text-gray-600 font-bold text-lg mb-7">
            إنشاء حساب جديد
          </h3>
          <div className="py-14 flex justify-center">
            <div className="flex items-center relative">
              <h4
                className={`p-2 w-7 h-7 flex justify-center items-center text-white rounded-full bg-primaryColor text-sm z-10`}
              >
                1
              </h4>
              <span className={`w-32 h-[6px] bg-primaryColor -ms-2`}></span>
              <h4
                className={`p-2 w-7 h-7 flex justify-center items-center text-white rounded-full ${
                  step >= 2 ? "bg-primaryColor" : "bg-gray-500"
                } -ms-1 text-sm z-10`}
              >
                2
              </h4>
              <span
                className={`w-32 h-[6px] ${
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
                className={`w-32 h-[6px] ${
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
            <div>
              <h3 className="text-gray-600 font-bold mb-5">
                المعلومات الاساسية
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <TextInput
                    id="name"
                    type="text"
                    rightIcon={FaUser}
                    placeholder="أدخل إسمك هنا..."
                    required
                  />
                </div>
                <div className="flex flex-col gap-2" dir="rtl">
                  <Label htmlFor="email">البريد الالكتروني</Label>
                  <TextInput
                    id="email"
                    type="email"
                    rightIcon={HiMail}
                    placeholder="ahmed@example.com"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2" dir="rtl">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <TextInput
                    id="phone"
                    type="number"
                    rightIcon={Phone}
                    placeholder="06********"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2" dir="rtl">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <TextInput
                    id="password"
                    type="password"
                    placeholder="*************"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2" dir="rtl">
                  <Label htmlFor="states">الولاية </Label>
                  <select
                    className="border p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
                    id="states"
                    required
                    defaultValue=""
                  >
                    <option value="">اختر ولاية</option>
                    {stats.map((ele) => (
                      <option value={ele.id}>{ele.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2" dir="rtl">
                  <Label htmlFor="cities">البلدية </Label>
                  <select
                    className="border p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
                    id="cities"
                    required
                    defaultValue=""
                  >
                    <option value="">اختر بلدية </option>
                    <option>الفييييض</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  theme={flowbit.button}
                  color="primary"
                  onClick={() => nextStep()}
                >
                  التالي
                </Button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h3 className="text-gray-600 font-bold mb-5">
                المعلومات المهنية
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
                <div className="flex flex-col gap-2 col-span-2">
                  <Label htmlFor="spec">التخصص </Label>
                  <select
                    className="border p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
                    id="spec"
                    required
                    defaultValue=""
                  >
                    <option value="">اختر التخصص</option>
                    {spec.map((ele) => (
                      <option value={ele.value}>{ele.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="exper">سنوات الخبرة</Label>
                  <TextInput
                    id="exper"
                    type="number"
                    placeholder="عدد سنوات الخبرة"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2" dir="rtl">
                  <Label htmlFor="workplace">مكان العمل الحالي</Label>
                  <TextInput
                    id="workplace"
                    type="text"
                    placeholder="مستشفى/ عيادة"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2 col-span-2">
                  <Label htmlFor="pio">نبذة عامة </Label>
                  <Textarea
                    id="pio"
                    placeholder="نبذة عامة عنك ..."
                    required
                    rows={4}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  theme={flowbit.button}
                  color="primary"
                  outline
                  onClick={() => preStep()}
                >
                  السابق
                </Button>
                <Button
                  theme={flowbit.button}
                  color="primary"
                  onClick={() => nextStep()}
                >
                  التالي
                </Button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h3 className="text-gray-600 font-bold mb-5">
                المعلومات المهنية
              </h3>
              <div className="mb-7">
                <div className="flex flex-col gap-2 col-span-2">
                  <Label htmlFor="spec">الصورة الشخصية </Label>
                  <div className="border rounded-lg p-4 flex flex-col items-center md:flex-row gap-5 mb-5">
                    <img
                      src="/doctor1.jpg"
                      alt="doctor image"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="text-center md:text-start flex-1">
                      <h3 className=" text-gray-600 mb-2">صورة الملف الشخصي</h3>
                      <p className="text-sm text-gray-400 ">
                        يفضل استخدام صورة بحجم 400×400 بكسل
                      </p>
                    </div>
                    <Button
                      theme={flowbit.button}
                      color="primary"
                      className="flex gap-2"
                    >
                      <span>
                        <BsCamera size={18} className="text-white" />
                      </span>
                      <span>تغيير الصورة</span>
                    </Button>
                  </div>
                </div>

                <div className="flex  items-center gap-2 mb-5">
                  <Checkbox theme={flowbit.checkbox} id="accept" />
                  <Label htmlFor="accept">اوافق على الشروط والاحكام</Label>
                </div>
                <div className="flex flex-col gap-2 mb-5">
                  <Label htmlFor="bac">شهادة البكالوريا</Label>
                  <Label
                    htmlFor="bac"
                    className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <HiMiniDocumentPlus
                        size={73}
                        className="text-primaryColor mb-2"
                      />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold"> اسحب الملف هنا </span>{" "}
                        أو اضغط للاختيار
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        يدعم ملفات pdf و png و jpg الحد القصى : (2MB)
                      </p>
                    </div>
                    <FileInput id="bac" className="hidden" />
                  </Label>
                </div>
                <div className="flex flex-col gap-2 mb-5">
                  <Label htmlFor="spec-car">شهادة التخصص </Label>
                  <Label
                    htmlFor="spec-car"
                    className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <HiMiniDocumentPlus
                        size={73}
                        className="text-primaryColor mb-2"
                      />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold"> اسحب الملف هنا </span>{" "}
                        أو اضغط للاختيار
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        يدعم ملفات pdf و png و jpg الحد القصى : (2MB)
                      </p>
                    </div>
                    <FileInput id="spec-car" className="hidden" />
                  </Label>
                </div>
                <div className="flex flex-col gap-2 mb-5">
                  <Label htmlFor="profession"> رخصة مزاولة المهنة</Label>
                  <Label
                    htmlFor="profession"
                    className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <HiMiniDocumentPlus
                        size={73}
                        className="text-primaryColor mb-2"
                      />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold"> اسحب الملف هنا </span>{" "}
                        أو اضغط للاختيار
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        يدعم ملفات pdf و png و jpg الحد القصى : (2MB)
                      </p>
                    </div>
                    <FileInput id="profession" className="hidden" />
                  </Label>
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  theme={flowbit.button}
                  color="primary"
                  outline
                  onClick={() => preStep()}
                >
                  السابق
                </Button>
                <Button
                  theme={flowbit.button}
                  color="primary"
                  onClick={() => nextStep()}
                >
                  تسجيل
                </Button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <div className="p-3 rounded-full bg-gradient-to-r from-[#0F1242] to-[#008CFF] w-20 h-20 flex justify-center items-center m-auto mb-4">
                <FaCheck className="text-white" size={33} />
              </div>
              <h3 className="text-primaryColor font-bold mb-5 text-center text-xl">
                مرحباً بك في عائلتنا
              </h3>
              <p className="text-center text-gray-400 mb-7">
                تم استلام طلبك بنجاح وسيتم مراجعته خلال 24-48 ساعة
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <div className="border shadow-md rounded-lg p-5 text-center">
                  <div className="p-3 w-20 h-20 flex justify-center items-center bg-[#afdeff] m-auto rounded-full mb-3">
                    <MdEmail size={40} className="text-[#0D99FF]" />
                  </div>
                  <h3 className="text-gray-600 mb-3">
                    تأكيد البريد الالكتروني
                  </h3>
                  <p className="text-sm text-gray-400">
                    تم إرسال رابط التفعيل إلى بريدك الإلكتروني
                  </p>
                </div>
                <div className="border shadow-md rounded-lg p-5 text-center">
                  <div className="p-3 w-20 h-20 flex justify-center items-center bg-[#f7e3b6] m-auto rounded-full mb-3">
                    <IoDocumentTextOutline
                      size={40}
                      className="text-[#FFAE00]"
                    />
                  </div>
                  <h3 className="text-gray-600 mb-3">مراجعة المستندات</h3>
                  <p className="text-sm text-gray-400">
                    سيتم التحقق من شهاداتك ومؤهلاتك الطبية{" "}
                  </p>
                </div>
                <div className="border shadow-md rounded-lg p-5 text-center">
                  <div className="p-3 w-20 h-20 flex justify-center items-center bg-[#b3f8d0] m-auto rounded-full mb-3">
                    <FaRegCheckCircle size={40} className="text-[#25A85C]" />
                  </div>
                  <h3 className="text-gray-600 mb-3">تفعيل الحساب</h3>
                  <p className="text-sm text-gray-400">
                    بعد الموافقة، سيتم تفعيل حسابك بشكل كامل
                  </p>
                </div>
              </div>
              <div className="border rounded-md p-10 mb-7">
                <div className="flex gap-2 items-center text-gray-600 mb-7">
                  <IoHelpCircleSharp className="text-primaryColor" size={28} />
                  <p>الخطوات القادمة</p>
                </div>
                <ul className="flex flex-col gap-5">
                  <li className="flex items-center gap-4">
                    <FaCircleCheck className="text-[#25A85C]" size={20} />
                    <p className="text-gray-600 text-sm">
                      ستصلك رسالة تأكيد على بريدك الإلكتروني
                    </p>
                  </li>
                  <li className="flex items-center gap-4">
                    <FaCircleCheck className="text-[#25A85C]" size={20} />
                    <p className="text-gray-600 text-sm">
                      سيتواصل معك فريق الدعم لإكمال عملية التحقق{" "}
                    </p>
                  </li>
                  <li className="flex items-center gap-4">
                    <FaCircleCheck className="text-[#25A85C]" size={20} />
                    <p className="text-gray-600 text-sm">
                      بعد الموافقة، يمكنك إكمال ملفك الشخصي وتحديد مواعيد العمل{" "}
                    </p>
                  </li>
                  <li className="flex items-center gap-4">
                    <FaCircleCheck className="text-[#25A85C]" size={20} />
                    <p className="text-gray-600 text-sm">
                      ستظهر في قائمة الأطباء المعتمدين وتبدأ باستقبال الاستشارات{" "}
                    </p>
                  </li>
                </ul>
              </div>
              <Link to="/" className="block w-fit m-auto">
                <Button
                  theme={flowbit.button}
                  color="primary"
                  className="m-auto"
                >
                  الانتقال الى الصفحة الرئيسية
                </Button>
              </Link>
            </div>
          )}
        </div>
        <div className="w-full lg:w-1/3 order-1 lg:order-2 border rounded-lg shadow-md p-7">
          <h3 className="text-lg mb-7 font-bold text-gray-600">
            انضم إلى شبكة الأطباء المعتمدين
          </h3>
          <div className="mb-7">
            <img
              src="/imgs/website/new-doctor.png"
              className="w-52 m-auto object-contain"
              alt="new doctor"
            />
          </div>
          <div className="flex gap-3 items-center mb-5">
            <div className="p-3 bg-primaryColor rounded-xl">
              <FaUserDoctor className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-gray-600 text-sm font-bold mb-1">
                بناء سمعتك المهنية
              </h3>
              <p className="text-[13px] text-gray-400">
                أنشئ ملفك الطبي الاحترافي وعزز تواجدك الرقمي في المجال الطبي
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-center mb-5">
            <div className="p-3 bg-[#e4d1ff] rounded-xl text-sm">
              <FaRegCalendarCheck className="text-[#9747FF]" size={22} />
            </div>
            <div>
              <h3 className="text-gray-600 font-bold mb-1 text-sm">
                مرونة في جدولة المواعيد
              </h3>
              <p className="text-[13px] text-gray-400 ">
                تحكم في مواعيد عملك وقدم استشاراتك عن بُعد بكل سهولة
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="p-3 bg-[#aefdcf] rounded-xl">
              <MdOutlineSecurity className="text-[#25A85C]" size={22} />
            </div>
            <div>
              <h3 className="text-gray-600 font-bold mb-1 text-sm">
                منصة آمنة وموثوقة{" "}
              </h3>
              <p className="text-[13px] text-gray-400">
                بيئة رقمية آمنة تحمي خصوصية بياناتك وبيانات مرضاك{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
