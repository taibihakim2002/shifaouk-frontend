import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { Link } from "react-router-dom";

export default function InfoCard({
  title,
  icon: Icon,
  color,
  value,
  valueText,
  percentage,
  percentageText,
  link,
}) {
  return (
    <Link to={link}>
      <div className="border rounded-lg relative overflow-hidden p-4 -z-10">
        {/* الشريط الجانبي الملون */}
        <div
          className="absolute z-40 top-0 start-0 w-[5px] h-full"
          style={{ backgroundColor: color }}
        ></div>

        {/* العنوان والأيقونة */}
        <div className="flex justify-between items-center mb-1">
          <p className="text-gray-600">{title}</p>
          <div
            className="p-2 rounded-full border"
            style={{
              borderColor: color,
              backgroundColor: `${color}44`, // شفافية
            }}
          >
            <Icon style={{ color }} size={20} />
          </div>
        </div>

        {/* القيمة */}
        <p className="font-bold text-[35px]" style={{ color }}>
          {value} {valueText && <span>{valueText}</span>}
        </p>

        {/* النسبة */}
        {percentage !== undefined && (
          <div className="flex gap-3 items-center">
            <p
              className={`text-sm flex items-center font-bold ${
                percentage > 0
                  ? "text-green-600"
                  : percentage < 0
                  ? "text-red-600"
                  : "text-gray-400"
              }`}
            >
              <span>{percentage >= 0 ? <GoArrowUp /> : <GoArrowDown />}</span>
              <span>{Math.abs(percentage)}</span>
              <span className="ms-2 text-gray-400 font-normal">
                {percentageText}
              </span>
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
