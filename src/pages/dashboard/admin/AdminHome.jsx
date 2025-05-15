import { FaRegCalendarCheck } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { SiGooglestreetview } from "react-icons/si";
import { TbPointFilled } from "react-icons/tb";
import { VscRunCoverage } from "react-icons/vsc";
import flowbit from "../../../config/flowbit";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Link } from "react-router-dom";

export default function AdminHome() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 xl:gap-x-14 gap-y-5 mb-7">
        <div className="flex items-center gap-5 p-5 border rounded-lg">
          <div className="p-3 bg-orange-100 rounded-lg">
            <SiGooglestreetview size={30} color="orange" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-grayBlue">كل الاطباء</p>
            <p className="text-xl font-bold">10</p>
          </div>
        </div>
        <div className="flex items-center gap-5  p-5 border rounded-lg">
          <div className="p-3 bg-green-100 rounded-lg">
            <VscRunCoverage size={30} color="green" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-grayBlue">الحجوزات </p>
            <p className="text-xl font-bold">5</p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-5 border rounded-lg">
          <div className="p-3 bg-red-100 rounded-lg">
            <IoCheckmarkDoneCircle size={30} color="red" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-grayBlue">المرضى </p>
            <p className="text-xl font-bold">5</p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-5 border rounded-lg">
          <div className="p-3 bg-blue-100 rounded-lg">
            <FaRegCalendarCheck size={30} color="blue" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-grayBlue">الحجوزات</p>
            <p className="text-xl font-bold">22</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="w-full lg:col-span-2  p-4 border rounded-xl">
          <h2 className="text-lg font-bold text-darkBlue mb-5 flex gap-2 items-center">
            <span> كل الاطباء</span>
            <TbPointFilled color="green" size={25} />
          </h2>
          <div className="flex flex-col gap-4">
            {/* <StatsTourCard />
            <StatsTourCard />
            <StatsTourCard /> */}
            <Link to="/dashboard/tours">
              <Button theme={flowbit.button} color="primary" className="w-full">
                عرض المزيد
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full lg:col-span-3 p-4 border rounded-xl">
          <h2 className="text-lg font-bold text-darkBlue mb-5">اخر الحجوزات</h2>

          <div className="overflow-x-auto mb-3">
            <Table theme={flowbit.table} className="relative -z-10">
              <TableHead>
                <TableHeadCell className="w-12">#</TableHeadCell>
                <TableHeadCell className="">الطبيب</TableHeadCell>
                <TableHeadCell className="w-36">المريض</TableHeadCell>
                <TableHeadCell className="w-36">التخصص</TableHeadCell>
                <TableHeadCell className="min-w-28">الموعد</TableHeadCell>
                <TableHeadCell className="min-w-28">الحالة</TableHeadCell>
                <TableHeadCell className="w-12">إجراء</TableHeadCell>
              </TableHead>
              <TableBody className="divide-y">
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>#1</TableCell>
                  <TableCell>د. أحمد بن يوسف</TableCell>
                  <TableCell>محمد طيبي</TableCell>
                  <TableCell>أمراض القلب</TableCell>
                  <TableCell>2025-05-15 | 10:30</TableCell>
                  <TableCell>
                    <span className="text-blue-600 px-2 py-1 rounded-lg bg-blue-50 text-[10px]">
                      في الانتظار
                    </span>
                  </TableCell>
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
                  <TableCell>#2</TableCell>
                  <TableCell>د. ليلى بوزيد</TableCell>
                  <TableCell>ياسين بن عمر</TableCell>
                  <TableCell>الطب النفسي</TableCell>
                  <TableCell>2025-05-16 | 14:00</TableCell>
                  <TableCell>
                    <span className="text-green-600 px-2 py-1 rounded-lg bg-green-50 text-[10px]">
                      مؤكد
                    </span>
                  </TableCell>
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
                  <TableCell>#3</TableCell>
                  <TableCell>د. سامي العيد</TableCell>
                  <TableCell>سهى بن عبد الله</TableCell>
                  <TableCell>طب الأطفال</TableCell>
                  <TableCell>2025-05-18 | 09:00</TableCell>
                  <TableCell>
                    <span className="text-red-600 px-2 py-1 rounded-lg bg-red-50 text-[10px]">
                      ملغي
                    </span>
                  </TableCell>
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
          <Link to="/dashboard/bookings">
            <Button
              theme={flowbit.button}
              color="primary"
              className="w-52 m-auto"
            >
              عرض المزيد
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
