import { Star, Stethoscope } from "lucide-react";
import SectionHeader from "../common/SectionHeader";
import { Button } from "flowbite-react";
import flowbit from "../../config/flowbit";
import { Link } from "react-router-dom";
import DoctorCard from "../common/DoctorCard";

const doctors = [
  {
    name: "معاوية احمد",
    description: "أخصائي امراض القلب",
    image: "/doctor2.jpg",
    link: "/profile",
    rating: 4,
  },
  {
    name: "طيبي عبد الحكيم",
    description: "أخصائي امراض المعدة",
    image: "/doctor1.jpg",
    link: "/profile",
    rating: 4,
  },
  {
    name: " حلباوي محمد",
    description: "أخصائي امراض الكبد",
    image: "doctor4.webp",
    link: "/profile",
    rating: 5,
  },
  {
    name: "محمدي اسامة",
    description: "أخصائي امراض الرئة",
    image: "doctor5.jpg",
    link: "/profile",
    rating: 3.5,
  },
];
export default function Doctors() {
  return (
    <div className="py-16 bg-primary-50">
      <SectionHeader sectionTitle="اطبائنا المميزون" icon={Stethoscope} />
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
        {doctors.map((ele, index) => (
          <DoctorCard ele={ele} key={index} />
        ))}
      </div>
      <div className="flex justify-center">
        <Link to="/doctors">
          <Button theme={flowbit.button} color="primary" pill size="md">
            عرض المزيد
          </Button>
        </Link>
      </div>
    </div>
  );
}
