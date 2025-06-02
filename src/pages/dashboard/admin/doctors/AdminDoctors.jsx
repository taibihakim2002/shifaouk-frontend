import { HiMiniPlusCircle, HiUsers } from "react-icons/hi2";
import DashPageHeader from "../../../../components/dashboard/common/DashPageHeader";
import {
  Button,
  Dropdown,
  DropdownItem,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import flowbit from "../../../../config/flowbit";
import { LoaderIcon, Search } from "lucide-react";
import { GiHealthNormal } from "react-icons/gi";
import { FaFilter } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";
import useApiRequest from "../../../../hooks/useApiRequest";
import { useEffect } from "react";
import globalApi from "../../../../utils/globalApi";
import formatDateTime from "../../../../utils/formatDateTime";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineDotsVertical, HiOutlineEye, HiTrash } from "react-icons/hi";

export default function AdminDoctors() {
  const navigate = useNavigate();
  const { data: doctors, loading, error, request } = useApiRequest();

  useEffect(() => {
    request(() => globalApi.getAllApprovedDoctors());
  }, []);

  console.log(doctors);

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap">
        <DashPageHeader
          Icon={HiUsers}
          title="الاطباء"
          description="إدارة وعرض بيانات الاطباء المسجلين في منصة شفاؤك"
        />
        <div className="flex flex-col md:flex-row gap-3">
          <Button theme={flowbit.button} color="primary" className="gap-2 mb-5">
            <span>
              <HiMiniPlusCircle size={18} />
            </span>
            <span>اضافة طبيب جديد</span>
          </Button>
          <Button
            theme={flowbit.button}
            color="yellow"
            className="gap-2 mb-5"
            outline
            onClick={() => navigate("/dashboard/doctors/requests")}
          >
            <span>
              <LoaderIcon size={18} />
            </span>
            <span> طلبات الانضمام</span>
          </Button>
        </div>
      </div>
      <div className="border rounded-lg p-10 flex items-center gap-8 jus flex-col md:flex-row mb-10">
        <div className="flex flex-col gap-2 w-full md:max-w-[500px]">
          <Label
            htmlFor="cities"
            className="flex items-center gap-2 text-gray-600"
          >
            البحث عن طبيب
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
        <div className="flex flex-col md:flex-row w-full items-center gap-5 ">
          <div className="flex flex-col gap-2 w-full md:w-44" dir="rtl">
            <div className="flex flex-col gap-2 w-full md:w-44" dir="rtl">
              <Label
                htmlFor="cities"
                className="flex items-center gap-2 text-gray-600"
              >
                <span>
                  <BsCalendarDateFill />
                </span>
                <span>اليوم </span>
              </Label>
              <TextInput id="birthdate" theme={flowbit.input} type="date" />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-44" dir="rtl">
            <div className="flex flex-col gap-2 w-full md:w-44" dir="rtl">
              <Label
                htmlFor="cities"
                className="flex items-center gap-2 text-gray-600"
              >
                <span>
                  <GiHealthNormal />
                </span>
                <span>الحالة الصحية</span>
              </Label>
              <select
                className="w-full border text-sm p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
                id="cities"
                required
                defaultValue=""
              >
                <option value="">اختر الحالة</option>
                <option>اليوم</option>
                <option>امس</option>
                <option>هذا الاسبوع</option>
                <option>هذا الشهر</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-44" dir="rtl">
            <Label
              htmlFor="cities"
              className="flex items-center gap-2 text-gray-600"
            >
              <span>
                <FaFilter />
              </span>
              <span>ترتيب حسب</span>
            </Label>
            <select
              className="w-full border text-sm p-1 rounded-md bg-gray-50 text-gray-900 border-gray-300 "
              id="cities"
              required
              defaultValue=""
            >
              <option value="">التاريخ</option>
              <option>مكتملة</option>
              <option>معلقة</option>
              <option>مؤكدة</option>
              <option>مرفوضة </option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-3">
          <Table className="text-right">
            <TableHead className="bg-gray-100">
              <TableHeadCell>الاسم</TableHeadCell>
              <TableHeadCell>البريد الالكتروني</TableHeadCell>
              <TableHeadCell>رقم الهاتف</TableHeadCell>
              <TableHeadCell className="lg:w-32 ">التخصص</TableHeadCell>
              <TableHeadCell className="lg:w-22">عدد المرضى</TableHeadCell>
              <TableHeadCell>تاريخ التسجيل</TableHeadCell>
              <TableHeadCell className="lg:w-22">الحالة</TableHeadCell>
              <TableHeadCell>الإجراء</TableHeadCell>
            </TableHead>
            <TableBody>
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <TableRow key={index} className="bg-white animate-pulse">
                    {[...Array(8)].map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : doctors?.data?.users?.length > 0 ? (
                doctors.data.users.map((doctor, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/dashboard/doctors/${doctor._id}`)}
                  >
                    <TableCell>
                      {doctor.fullName.first} {doctor.fullName.second}
                    </TableCell>
                    <TableCell>{doctor.email}</TableCell>
                    <TableCell>{doctor.phone}</TableCell>
                    <TableCell>{doctor.doctorProfile.specialization}</TableCell>
                    <TableCell className="text-center">nan</TableCell>
                    <TableCell>
                      {formatDateTime(doctor.createdAt, "date")}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] ${
                          doctor?.doctorProfile?.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {doctor?.doctorProfile?.status === "approved"
                          ? "مفعل"
                          : "غير مفعل"}
                      </span>
                    </TableCell>
                    <TableCell
                      className="flex gap-2 justify-center items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Dropdown
                        className="w-52"
                        label={
                          <HiOutlineDotsVertical className="text-xl cursor-pointer" />
                        }
                        inline
                        arrowIcon={false}
                      >
                        <Link to={`/doctors/${doctor._id}`}>
                          <DropdownItem icon={HiOutlineEye}>
                            عرض الملف الشخصي
                          </DropdownItem>
                        </Link>
                        <DropdownItem icon={HiTrash}>حذف</DropdownItem>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-5 text-gray-500"
                  >
                    لا توجد بيانات
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
