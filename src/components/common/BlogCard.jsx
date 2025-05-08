export default function BlogCard({ ele, key }) {
  return (
    <div
      className="flex flex-col gap-3 group  p-5 rounded-xl bg-white"
      key={key}
    >
      <img
        className="w-full h-64 rounded-xl object-cover group-hover:brightness-75 transition"
        src={ele.blogImage}
        alt={ele.title}
      />
      <h3 className="text-lg font-bold text-secondaryColor">{ele.title}</h3>
      <div className="flex gap-2 items-center">
        <img
          className="w-5 h-5 object-cover rounded-full"
          src={ele.doctorImage}
          alt={ele.doctor}
        />
        <p className="text-primary-500 text-sm">{ele.doctor} د، </p>
      </div>
      <p className="py-1 px-3 bg-[#E2EAF6] w-fit text-[#143566] text-sm rounded-md font-bold">
        {ele.tag}
      </p>
    </div>
  );
}
