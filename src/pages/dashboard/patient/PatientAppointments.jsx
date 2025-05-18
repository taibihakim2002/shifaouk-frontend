import { Button, Label } from "flowbite-react";
import flowbit from "../../../config/flowbit";
import { GiSandsOfTime } from "react-icons/gi";
import { FaUserAlt, FaVideo } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { MdDateRange, MdDone } from "react-icons/md";
import { PiInfoFill } from "react-icons/pi";
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
export default function PatientAppointments() {
  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center mb-4 gap-5 ">
          <IoDocumentText size={33} />
          <h2 className="text-xl text-gray-600 font-bold">ادارة المواعيد</h2>
        </div>
        <p className="ps-10 text-lg text-gray-400">
          قم بادارة مواعيدك مع الاطباء
        </p>
      </div>
      <div className="rounded-lg bg-[url('/imgs/website/dash-next.png')] bg-cover p-5 mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-5">
          <div className="flex gap-4 items-center">
            <img
              src="/doctor1.jpg"
              alt="Doctor"
              className="w-20 h-20 object-cover rounded-full "
            />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                د. صخري معاذ
              </h3>
              <p className="text-gray-700">اخصائي امراض قلبية </p>
            </div>
          </div>
          <Button
            theme={flowbit.button}
            color="light"
            className="text-primaryColor gap-3"
          >
            <FaVideo size={22} className="text-primaryColor" />
            <span>انضم الان</span>
          </Button>
        </div>
        <div className="flex justify-center text-white pb-5 border-b border-b-gray-500">
          <span className="me-2"> مكالمة فيديو </span>|
          <span className="ms-2">اليوم، 02:30 مساءً</span>
        </div>
        <div className="flex justify-between mt-3 text-white">
          <div className="flex gap-3 items-center ">
            <GiSandsOfTime size={22} />
            <p>متبقي على الموعد</p>
          </div>

          <p>02ساعة : 15 دقيقة : 15 ثانية </p>
        </div>
      </div>
      <div className="p-5 border rounded-lg mb-8">
        <div className="flex items-center justify-between mb-14">
          <h3 className="text-gray-600 text-lg">الاستشارات الطبية</h3>
          <div className="flex items-center gap-2">
            <p className="text-gray-400">مسح التصفية</p>
            <TiDelete className="text-gray-600" size={22} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">حالة الاستشارة</Label>
            <select
              className="border p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
              id="states"
              required
              defaultValue=""
            >
              <option value="">اختر حالة الاستشارة</option>
              <option>منتهية</option>
              <option>قيد المراجعة</option>
              <option>تم التأكيد</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">التاريخ </Label>
            <select
              className="border p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
              id="states"
              required
              defaultValue=""
            >
              <option value="">اختر التاريخ </option>
              <option>اخر السنة</option>
              <option>اخر الشهر </option>
              <option> اخر 3 اشهر</option>
              <option> اخر 6 اشهر</option>
              <option>الكل</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">التخصص </Label>
            <select
              className="border p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
              id="states"
              required
              defaultValue=""
            >
              <option value="">اختر التخصص</option>
              {spec.map((ele) => (
                <option value={ele.value}>{ele.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="p-5 relative border rounded-lg mb-8">
        <div className="p-5 relative border rounded-lg mb-8 flex flex-col gap-5 overflow-hidden">
          <div className="absolute bg-[#25A85C] w-3 h-full start-0 top-0"></div>
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-5">
            <div>
              <div className="flex gap-4 items-center">
                <img
                  src="/doctor2.jpg"
                  alt="doctor"
                  className="w-24 h-24 object-cover rounded-full"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-600 mb-3">
                    د. فلانة الفلانية
                  </h3>
                  <p className="text-gray-400">اخصائية امراض المعدة</p>
                </div>
              </div>
              <div className="ps-28 flex gap-3 items-center">
                <div className="flex items-center gap-2 text-[#25A85C] bg-[#b6ffd4] py-2 px-4 rounded-lg">
                  <MdDone />
                  <span>منتهية</span>
                </div>
                <div className="flex items-center gap-2 text-[#25A85C] border border-[#25A85C] py-2 px-4 rounded-lg">
                  <FaVideo />
                  <span>مكالمة فيديو</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-2 items-center text-gray-600 mb-3">
                <MdDateRange size={22} className="text-gray-600" />
                <p>اليوم، 02:30 مساءا</p>
              </div>
              <div>
                <Button
                  theme={flowbit.button}
                  color="light"
                  className="text-primaryColor gap-2"
                >
                  <PiInfoFill size={18} />
                  <span>تفاصيل</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 relative border rounded-lg mb-8 flex flex-col gap-5 overflow-hidden">
          <div className="absolute bg-[#25A85C] w-3 h-full start-0 top-0"></div>
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-5">
            <div>
              <div className="flex gap-4 items-center">
                <img
                  src="/doctor2.jpg"
                  alt="doctor"
                  className="w-24 h-24 object-cover rounded-full"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-600 mb-3">
                    د. فلانة الفلانية
                  </h3>
                  <p className="text-gray-400">اخصائية امراض المعدة</p>
                </div>
              </div>
              <div className="ps-28 flex gap-3 items-center">
                <div className="flex items-center gap-2 text-[#25A85C] bg-[#b6ffd4] py-2 px-4 rounded-lg">
                  <MdDone />
                  <span>منتهية</span>
                </div>
                <div className="flex items-center gap-2 text-[#25A85C] border border-[#25A85C] py-2 px-4 rounded-lg">
                  <FaVideo />
                  <span>مكالمة فيديو</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-2 items-center text-gray-600 mb-3">
                <MdDateRange size={22} className="text-gray-600" />
                <p>اليوم، 02:30 مساءا</p>
              </div>
              <div>
                <Button
                  theme={flowbit.button}
                  color="light"
                  className="text-primaryColor gap-2"
                >
                  <PiInfoFill size={18} />
                  <span>تفاصيل</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 relative border rounded-lg mb-8 flex flex-col gap-5 overflow-hidden">
          <div className="absolute bg-[#25A85C] w-3 h-full start-0 top-0"></div>
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-5">
            <div>
              <div className="flex gap-4 items-center">
                <img
                  src="/doctor2.jpg"
                  alt="doctor"
                  className="w-24 h-24 object-cover rounded-full"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-600 mb-3">
                    د. فلانة الفلانية
                  </h3>
                  <p className="text-gray-400">اخصائية امراض المعدة</p>
                </div>
              </div>
              <div className="ps-28 flex gap-3 items-center">
                <div className="flex items-center gap-2 text-[#25A85C] bg-[#b6ffd4] py-2 px-4 rounded-lg">
                  <MdDone />
                  <span>منتهية</span>
                </div>
                <div className="flex items-center gap-2 text-[#25A85C] border border-[#25A85C] py-2 px-4 rounded-lg">
                  <FaVideo />
                  <span>مكالمة فيديو</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-2 items-center text-gray-600 mb-3">
                <MdDateRange size={22} className="text-gray-600" />
                <p>اليوم، 02:30 مساءا</p>
              </div>
              <div>
                <Button
                  theme={flowbit.button}
                  color="light"
                  className="text-primaryColor gap-2"
                >
                  <PiInfoFill size={18} />
                  <span>تفاصيل</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
