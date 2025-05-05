import { Star, Stethoscope } from "lucide-react";
import SectionHeader from "../common/SectionHeader";
import { Button } from "flowbite-react";
import flowbit from "../../config/flowbit";

const doctors = [
  {
    name: "معاوية احمد",
    description: "أخصائي امراض القلب",
    image: "/doctor2.jpg",
    rating: 4,
  },
  {
    name: "طيبي عبد الحكيم",
    description: "أخصائي امراض المعدة",
    image: "/doctor1.jpg",
    rating: 4,
  },
  {
    name: " حلباوي محمد",
    description: "أخصائي امراض الكبد",
    image: "doctor4.webp",
    rating: 5,
  },
  {
    name: "محمدي اسامة",
    description: "أخصائي امراض الرئة",
    image: "doctor5.jpg",
    rating: 3.5,
  },
];
export default function Doctors() {
  return (
    <div className="py-16 bg-primary-50">
      <SectionHeader sectionTitle="اطبائنا المميزون" icon={Stethoscope} />
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
        {doctors.map((ele) => (
          <div className="rounded-xl relative h-80 overflow-hidden group">
            <img
              className="w-full h-full absolute object-cover group-hover:scale-105 transition"
              src={ele.image}
              alt="Doctor"
            />
            <div className="absolute w-full h-32 bottom-0 left-0 bg-gradient-to-t from-primaryColor to-transparent"></div>
            <div className="relative z-10 flex flex-col justify-end items-center  h-full py-5">
              <h3 className="text-[18px] text-white  mb-3">{ele.name}</h3>
              <div className="flex justify-between w-full px-5 text-sm text-white">
                <p className=" ">{ele.description}</p>
                <div className="flex gap-1 items-center justify-center">
                  <Star className="text-yellow-300" size={15} strokeWidth={3} />

                  <p className="text-yellow-300 font-bold">{ele.rating}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button theme={flowbit.button} color="primary" pill size="md">
          عرض المزيد
        </Button>
      </div>
    </div>
  );
}
