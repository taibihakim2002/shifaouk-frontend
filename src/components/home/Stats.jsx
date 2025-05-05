const stats = [
  { title: "استشارة يومية", value: "+320" },
  { title: "مريض مسجل", value: "+1000" },
  { title: "طبيب خبير", value: "+412" },
  { title: "عيادة مسجلة", value: "+91" },
];

export default function Stats() {
  return (
    <div className="bg-primaryColor py-10">
      <div className="container grid grid-cols-2  lg:grid-cols-4 gap-10">
        {stats.map((ele) => (
          <div className="flex flex-col gap-3 items-center justify-center">
            <h3 className="text-white font-bold text-[40px]">{ele.value}</h3>
            <p className="text-gray-300  text-md">{ele.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
