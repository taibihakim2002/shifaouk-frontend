import { FaUserDoctor } from "react-icons/fa6";
import DashPageHeader from "../../../../components/dashboard/common/DashPageHeader";
import globalApi from "../../../../utils/globalApi";
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
import { HiOutlineDotsVertical, HiOutlineEye, HiTrash } from "react-icons/hi";
import useApiRequest from "../../../../hooks/useApiRequest";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const doctors = [
  {
    id: 1,
    name: "د. أحمد بن يوسف",
    email: "ahmed.benyousef@example.com",
    phone: "0555123456",
    specialty: "طب القلب",
    patientsCount: 120,
    registeredAt: "2025-05-20",
    state: "الجزائر",
    experienceYears: 10,
    workPlace: "مستشفى مصطفى باشا",
  },
  {
    id: 2,
    name: "د. سميرة بوشامة",
    email: "samira.bouchama@example.com",
    phone: "0555987452",
    specialty: "طب الأطفال",
    patientsCount: 75,
    registeredAt: "2025-05-22",
    state: "وهران",
    experienceYears: 7,
    workPlace: "مستشفى وهران الجامعي",
  },
  {
    id: 3,
    name: "د. كمال بن عبد الله",
    email: "kamal.benabdallah@example.com",
    phone: "0567432100",
    specialty: "جراحة العظام",
    patientsCount: 95,
    registeredAt: "2025-05-25",
    state: "قسنطينة",
    experienceYears: 12,
    workPlace: "عيادة ابن خلدون",
  },
  {
    id: 4,
    name: "د. ليلى حمدي",
    email: "leila.hamdi@example.com",
    phone: "0556321789",
    specialty: "الطب العام",
    patientsCount: 150,
    registeredAt: "2025-05-21",
    state: "سطيف",
    experienceYears: 5,
    workPlace: "مستوصف سطيف المركزي",
  },
];

export default function JoiningRequests() {
  const { data, error, loading, request } = useApiRequest();
  const navigate = useNavigate();
  useEffect(() => {
    request(globalApi.getDoctorsRequests);
  }, []);

  return (
    <div>
      <DashPageHeader
        Icon={FaUserDoctor}
        title="طلبات الانضمام"
        description="قم بادارة طلبات الاطباء للانضمام الى منصة شفائك"
      />

      <div className="">
        <Table className="text-right">
          <TableHead className="bg-gray-100">
            <TableHeadCell>رقم الطلب</TableHeadCell>
            <TableHeadCell>الاسم</TableHeadCell>
            <TableHeadCell>البريد الالكتروني</TableHeadCell>
            <TableHeadCell>رقم الهاتف</TableHeadCell>
            <TableHeadCell>التخصص</TableHeadCell>

            <TableHeadCell>الولاية</TableHeadCell>
            <TableHeadCell>سنوات الخبرة</TableHeadCell>
            <TableHeadCell>مكان العمل</TableHeadCell>
            <TableHeadCell>الإجراء</TableHeadCell>
          </TableHead>
          <TableBody>
            {loading
              ? [...Array(5)].map((_, index) => (
                  <TableRow key={index} className="bg-white animate-pulse">
                    {[...Array(9)].map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : data?.data?.users?.map((doctor, index) => (
                  <TableRow
                    key={index}
                    className="bg-white hover:bg-gray-50 cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/dashboard/doctors/requests/${doctor?.doctorProfile?.requestId}`
                      )
                    }
                  >
                    <TableCell>#{doctor.doctorProfile.requestId}</TableCell>
                    <TableCell>
                      {doctor.fullName.first} {doctor.fullName.second}
                    </TableCell>
                    <TableCell>{doctor.email}</TableCell>
                    <TableCell>{doctor.phone}</TableCell>
                    <TableCell>{doctor.doctorProfile.specialization}</TableCell>
                    <TableCell>{doctor.state}</TableCell>
                    <TableCell>
                      {doctor.doctorProfile.experienceYears}
                    </TableCell>
                    <TableCell>{doctor.doctorProfile.workplace}</TableCell>
                    <TableCell
                      className="flex justify-center"
                      onClick={(e) => e.stopPropagation()}
                    >
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
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
