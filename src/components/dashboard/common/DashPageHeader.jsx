export default function DashPageHeader({ Icon, title, description }) {
  return (
    <div className="mb-10">
      <div className="flex items-center mb-4 gap-5 ">
        <Icon size={33} />
        <h2 className="text-xl text-gray-600 font-bold">{title}</h2>
      </div>
      {description && (
        <p className="ps-10 text-lg text-gray-400">{description}</p>
      )}
    </div>
  );
}
