export default function SectionHeader({ sectionTitle, icon }) {
  const Icon = icon;
  return (
    <div className="flex gap-3 justify-center mb-14">
      <Icon className="text-primaryColor" size={40} />
      <p className="text-primaryColor text-xl font-bold">{sectionTitle}</p>
    </div>
  );
}
