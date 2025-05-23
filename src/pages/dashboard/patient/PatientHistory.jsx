import { FaHistory } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { LuHeartPulse } from "react-icons/lu";
import { MdBloodtype } from "react-icons/md";
import flowbit from "../../../config/flowbit";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import DashPageHeader from "../../../components/dashboard/common/DashPageHeader";

export default function PatientHistory() {
  return (
    <div>
      <DashPageHeader
        Icon={FaHistory}
        title="السجل الطبي"
        description="قم بادارة سجلك الطبي"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <div className="p-5 border rounded-lg shadow-lg">
          <div className="flex gap-5 justify-between items-center mb-5">
            <h3 className="text-gray-600 text-lg">فصيلة الدم </h3>
            <MdBloodtype size={30} className="text-[#F50000]" />
          </div>
          <div className="flex justify-between items-center ps-10">
            <h3 className="text-[40px] font-bold">
              <sup>+</sup>A
            </h3>
          </div>
        </div>
        <div className="p-5 border rounded-lg shadow-lg">
          <div className="flex gap-5 justify-between items-center mb-5">
            <h3 className="text-gray-600 text-lg">الامراض المزمنة </h3>
            <LuHeartPulse size={30} className="text-[#9747FF]" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="py-2 px-3 bg-[#dcc2ff] text-[#9747FF] rounded-xl text-sm">
              قصور القلب
            </p>
            <p className="py-2 px-3 bg-[#dcc2ff] text-[#9747FF] rounded-xl text-sm">
              الذبحة الصدرية
            </p>
            <p className="py-2 px-3 bg-[#dcc2ff] text-[#9747FF] rounded-xl text-sm">
              السكري
            </p>
          </div>
        </div>
        <div className="p-5 border rounded-lg shadow-lg">
          <div className="flex gap-5 justify-between items-center mb-5">
            <h3 className="text-gray-600 text-lg"> أدوية دائمة </h3>
            <GiMedicines size={30} className="text-[#25A85C]" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="py-2 px-3 bg-[#ceffe3] text-[#25A85C] rounded-xl text-sm">
              aspirine
            </p>
            <p className="py-2 px-3 bg-[#ceffe3] text-[#25A85C] rounded-xl text-sm">
              prastamol
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-600 mb-5">
          الاستشارات الطبية السابقة
        </h2>

        <div className="overflow-x-auto mb-3">
          <Table theme={flowbit.table} className="relative -z-10">
            <TableHead>
              <TableHeadCell className="w-12">#</TableHeadCell>
              <TableHeadCell className="">الطبيب</TableHeadCell>
              <TableHeadCell className="min-w-28">التاريخ</TableHeadCell>
              <TableHeadCell className="w-36">التخصص</TableHeadCell>
              <TableHeadCell className="min-w-28">الوصفة الطبية</TableHeadCell>
              <TableHeadCell className="min-w-28">التفاصيل</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>#1</TableCell>
                <TableCell>د. أحمد بن يوسف</TableCell>
                <TableCell> 2025-05-15 | 10:30</TableCell>
                <TableCell>أمراض القلب</TableCell>
                <TableCell>تحميل</TableCell>
                <TableCell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    تعديل
                  </a>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>#1</TableCell>
                <TableCell>د. أحمد بن يوسف</TableCell>
                <TableCell> 2025-05-15 | 10:30</TableCell>
                <TableCell>أمراض القلب</TableCell>
                <TableCell>تحميل</TableCell>
                <TableCell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    تعديل
                  </a>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>#1</TableCell>
                <TableCell>د. أحمد بن يوسف</TableCell>
                <TableCell> 2025-05-15 | 10:30</TableCell>
                <TableCell>أمراض القلب</TableCell>
                <TableCell>تحميل</TableCell>
                <TableCell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    تعديل
                  </a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
