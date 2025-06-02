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
import { Search } from "lucide-react";
import { GiHealthNormal } from "react-icons/gi";
import { FaFilter } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";
import useApiRequest from "../../../../hooks/useApiRequest";
import { useEffect } from "react";
import globalApi from "../../../../utils/globalApi";
import formatDateTime from "../../../../utils/formatDateTime";
import { HiOutlineDotsVertical, HiOutlineEye, HiTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function AdminPatients() {
  const navigate = useNavigate();
  const { data: patients, loading, error, request } = useApiRequest();

  useEffect(() => {
    request(() => globalApi.getAllPatients());
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center flex-wrap">
        <DashPageHeader
          Icon={HiUsers}
          title="المرضى"
          description="إدارة وعرض بيانات المرضى المسجلين في منصة شفاؤك"
        />
        <Button theme={flowbit.button} color="primary" className="gap-2 mb-5">
          <span>
            <HiMiniPlusCircle size={18} />
          </span>
          <span>اضافة مريض جديد</span>
        </Button>
      </div>
      <div className="border rounded-lg p-10 flex items-center gap-8 jus flex-col md:flex-row mb-10">
        <div className="flex flex-col gap-2 w-full md:max-w-[500px]">
          <Label
            htmlFor="cities"
            className="flex items-center gap-2 text-gray-600"
          >
            البحث عن مريض
          </Label>
          <TextInput
            theme={flowbit.input}
            color="primary"
            className="w-full "
            id="search"
            type="text"
            rightIcon={Search}
            placeholder="ابحث عن مريض..."
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
        <div className=" mb-3">
          <Table className="text-right">
            <TableHead className="bg-gray-100">
              <TableHeadCell>الاسم</TableHeadCell>
              <TableHeadCell>البريد الالكتروني</TableHeadCell>
              <TableHeadCell>رقم الهاتف</TableHeadCell>
              <TableHeadCell>عدد الاستشارات</TableHeadCell>
              <TableHeadCell>الجنس </TableHeadCell>
              <TableHeadCell>تاريخ التسجيل</TableHeadCell>
              <TableHeadCell>الحالة</TableHeadCell>
              <TableHeadCell>الإجراء</TableHeadCell>
            </TableHead>
            <TableBody>
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <TableRow key={index} className="bg-white animate-pulse">
                    {[...Array(7)].map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : patients?.data?.users?.length > 0 ? (
                patients.data.users.map((patient, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() =>
                      navigate(`/dashboard/patients/${patient._id}`)
                    }
                  >
                    <TableCell>
                      {patient.fullName.first} {patient.fullName.second}
                    </TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell className="text-center">nan</TableCell>
                    <TableCell>
                      {patient.patientProfile.gender == "male"
                        ? "ذكر "
                        : "أنثى"}
                    </TableCell>
                    <TableCell>
                      {formatDateTime(patient.createdAt, "date")}
                    </TableCell>
                    <TableCell>
                      <span className="px-3 py-1 rounded-full text-[11px] bg-green-100 text-green-800">
                        نشط
                      </span>
                    </TableCell>
                    <TableCell className="flex gap-2 justify-center items-center">
                      <Dropdown
                        label={
                          <HiOutlineDotsVertical className="text-xl cursor-pointer" />
                        }
                        inline
                        arrowIcon={false}
                      >
                        <DropdownItem icon={HiOutlineEye}>
                          عرض التفاصيل
                        </DropdownItem>
                        <DropdownItem icon={HiTrash}>حذف</DropdownItem>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
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
