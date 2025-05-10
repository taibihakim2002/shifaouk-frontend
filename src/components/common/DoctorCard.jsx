import { Button } from "flowbite-react";
import { Star } from "lucide-react";
import flowbit from "../../config/flowbit";
import { Link } from "react-router-dom";

export default function DoctorCard({ ele, key }) {
  return (
    <div className="rounded-xl relative h-80 overflow-hidden group" key={key}>
      <img
        className="w-full h-full absolute object-cover group-hover:scale-105 transition"
        src={ele.image}
        alt="Doctor"
      />
      <div className="absolute w-full h-56 bottom-0 left-0 bg-gradient-to-t from-secondaryColor to-transparent"></div>
      <div className="relative z-10 flex flex-col justify-end items-center h-full py-5 px-5">
        <h3 className="text-[18px] text-white font-bold  mb-3">{ele.name}</h3>
        <div className="flex justify-between w-full text-sm text-white mb-3">
          <p className=" ">{ele.description}</p>
          <div className="flex gap-1 items-center justify-center">
            <Star className="text-yellow-300" size={15} strokeWidth={3} />
            <p className="text-yellow-300 font-bold">{ele.rating}</p>
          </div>
        </div>

        <Link to={ele.link} className="w-full">
          <Button
            theme={flowbit.button}
            color="primary"
            className="w-full"
            size="sm"
          >
            إستشر الان
          </Button>
        </Link>
      </div>
    </div>
  );
}
