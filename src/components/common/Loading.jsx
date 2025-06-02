import { Spinner } from "flowbite-react";

export default function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center gap-2">
      <Spinner className="border-primaryColor" size="md" />
      <p className="text-sm text-gray-600">جاري التحميل</p>
    </div>
  );
}
