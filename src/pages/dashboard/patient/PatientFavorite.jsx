import { GrFavorite } from "react-icons/gr";
import DashPageHeader from "../../../components/dashboard/common/DashPageHeader";
import { Button, Label, Rating, RatingStar } from "flowbite-react";
import flowbit from "../../../config/flowbit";
import { MdAccessTimeFilled, MdFavorite } from "react-icons/md";
import { BiCalendarCheck } from "react-icons/bi";
import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
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

export default function PatientFavorite() {
  const [favorite, setFavorite] = useState(true);
  return (
    <div>
      <DashPageHeader
        Icon={GrFavorite}
        title="المفضلة"
        description="قم بادارة المفضلة "
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="relative p-5 border rounded-lg hover:bg-blue-50">
          <div>
            {favorite ? (
              <Button
                theme={flowbit.button}
                color="noColor"
                className="absolute end-1 top-1 p-0 focus:ring-0"
                onClick={() => setFavorite(false)}
              >
                <FaBookmark size={22} className="text-primaryColor" />
              </Button>
            ) : (
              <Button
                theme={flowbit.button}
                color="noColor"
                className="absolute end-1 top-1 p-0 focus:ring-0"
                onClick={() => setFavorite(true)}
              >
                <FaRegBookmark size={22} className="text-primaryColor" />
              </Button>
            )}
          </div>
          <div className="flex gap-3 items-center border-b pb-3 mb-3">
            <img
              src="/doctor1.jpg"
              alt="Doctor"
              className="w-20 h-20 object-cover rounded-full"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-600 mb-2">
                د. صخري معاذ
              </h3>
              <p className="text-gray-400 text-sm mb-2">اخصائي امراض قلبية</p>
              <Rating>
                <RatingStar />
                <RatingStar />
                <RatingStar />
                <RatingStar />
                <RatingStar filled={false} />
                <p className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  4.5
                </p>
              </Rating>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <MdAccessTimeFilled size={22} className="text-primaryColor" />
              <div className="text-gray-400 ">
                <span>اخر استشارة: </span>
                <span>منذ شهر</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <BiCalendarCheck size={22} className="text-primaryColor" />
              <div className="text-gray-400 ">
                <span>عدد الاستشارات المنجزة : </span>
                <span>10</span>
              </div>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Button theme={flowbit.button} size="sm" color="primary">
                حجز استشارة
              </Button>
              <Button theme={flowbit.button} size="sm" color="primary" outline>
                عرض الملف الشخصي
              </Button>
            </div>
          </div>
        </div>
        <div className="relative p-5 border rounded-lg hover:bg-blue-50">
          <div>
            {favorite ? (
              <Button
                theme={flowbit.button}
                color="noColor"
                className="absolute end-1 top-1 p-0 focus:ring-0"
                onClick={() => setFavorite(false)}
              >
                <FaBookmark size={22} className="text-primaryColor" />
              </Button>
            ) : (
              <Button
                theme={flowbit.button}
                color="noColor"
                className="absolute end-1 top-1 p-0 focus:ring-0"
                onClick={() => setFavorite(true)}
              >
                <FaRegBookmark size={22} className="text-primaryColor" />
              </Button>
            )}
          </div>
          <div className="flex gap-3 items-center border-b pb-3 mb-3">
            <img
              src="/doctor1.jpg"
              alt="Doctor"
              className="w-20 h-20 object-cover rounded-full"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-600 mb-2">
                د. صخري معاذ
              </h3>
              <p className="text-gray-400 text-sm mb-2">اخصائي امراض قلبية</p>
              <Rating>
                <RatingStar />
                <RatingStar />
                <RatingStar />
                <RatingStar />
                <RatingStar filled={false} />
                <p className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  4.5
                </p>
              </Rating>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <MdAccessTimeFilled size={22} className="text-primaryColor" />
              <div className="text-gray-400 ">
                <span>اخر استشارة: </span>
                <span>منذ شهر</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <BiCalendarCheck size={22} className="text-primaryColor" />
              <div className="text-gray-400 ">
                <span>عدد الاستشارات المنجزة : </span>
                <span>10</span>
              </div>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Button theme={flowbit.button} size="sm" color="primary">
                حجز استشارة
              </Button>
              <Button theme={flowbit.button} size="sm" color="primary" outline>
                عرض الملف الشخصي
              </Button>
            </div>
          </div>
        </div>
        <div className="relative p-5 border rounded-lg hover:bg-blue-50">
          <div>
            {favorite ? (
              <Button
                theme={flowbit.button}
                color="noColor"
                className="absolute end-1 top-1 p-0 focus:ring-0"
                onClick={() => setFavorite(false)}
              >
                <FaBookmark size={22} className="text-primaryColor" />
              </Button>
            ) : (
              <Button
                theme={flowbit.button}
                color="noColor"
                className="absolute end-1 top-1 p-0 focus:ring-0"
                onClick={() => setFavorite(true)}
              >
                <FaRegBookmark size={22} className="text-primaryColor" />
              </Button>
            )}
          </div>
          <div className="flex gap-3 items-center border-b pb-3 mb-3">
            <img
              src="/doctor1.jpg"
              alt="Doctor"
              className="w-20 h-20 object-cover rounded-full"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-600 mb-2">
                د. صخري معاذ
              </h3>
              <p className="text-gray-400 text-sm mb-2">اخصائي امراض قلبية</p>
              <Rating>
                <RatingStar />
                <RatingStar />
                <RatingStar />
                <RatingStar />
                <RatingStar filled={false} />
                <p className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  4.5
                </p>
              </Rating>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <MdAccessTimeFilled size={22} className="text-primaryColor" />
              <div className="text-gray-400 ">
                <span>اخر استشارة: </span>
                <span>منذ شهر</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <BiCalendarCheck size={22} className="text-primaryColor" />
              <div className="text-gray-400 ">
                <span>عدد الاستشارات المنجزة : </span>
                <span>10</span>
              </div>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Button theme={flowbit.button} size="sm" color="primary">
                حجز استشارة
              </Button>
              <Button theme={flowbit.button} size="sm" color="primary" outline>
                عرض الملف الشخصي
              </Button>
            </div>
          </div>
        </div>
        <div className="relative p-5 border rounded-lg hover:bg-blue-50">
          <div>
            {favorite ? (
              <Button
                theme={flowbit.button}
                color="noColor"
                className="absolute end-1 top-1 p-0 focus:ring-0"
                onClick={() => setFavorite(false)}
              >
                <FaBookmark size={22} className="text-primaryColor" />
              </Button>
            ) : (
              <Button
                theme={flowbit.button}
                color="noColor"
                className="absolute end-1 top-1 p-0 focus:ring-0"
                onClick={() => setFavorite(true)}
              >
                <FaRegBookmark size={22} className="text-primaryColor" />
              </Button>
            )}
          </div>
          <div className="flex gap-3 items-center border-b pb-3 mb-3">
            <img
              src="/doctor1.jpg"
              alt="Doctor"
              className="w-20 h-20 object-cover rounded-full"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-600 mb-2">
                د. صخري معاذ
              </h3>
              <p className="text-gray-400 text-sm mb-2">اخصائي امراض قلبية</p>
              <Rating>
                <RatingStar />
                <RatingStar />
                <RatingStar />
                <RatingStar />
                <RatingStar filled={false} />
                <p className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  4.5
                </p>
              </Rating>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <MdAccessTimeFilled size={22} className="text-primaryColor" />
              <div className="text-gray-400 ">
                <span>اخر استشارة: </span>
                <span>منذ شهر</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <BiCalendarCheck size={22} className="text-primaryColor" />
              <div className="text-gray-400 ">
                <span>عدد الاستشارات المنجزة : </span>
                <span>10</span>
              </div>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Button theme={flowbit.button} size="sm" color="primary">
                حجز استشارة
              </Button>
              <Button theme={flowbit.button} size="sm" color="primary" outline>
                عرض الملف الشخصي
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
