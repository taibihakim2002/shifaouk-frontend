import React from "react";
import clsx from "clsx";

export default function AppAvatar({ url, alt = "Avatar", size = "md" }) {
  const sizeClasses = {
    xs: "h-6 w-6",
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-20 w-20",
    xl: "h-36 w-36",
  };

  const fallbackText = alt
    .split(" ")
    .map((word) => word[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-full border-2 border-white shadow-md bg-gray-100 dark:bg-gray-700 text-gray-500 flex items-center justify-center text-sm font-semibold",
        sizeClasses[size]
      )}
    >
      {url ? (
        <img
          src={url}
          alt={alt}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <span>{fallbackText}</span>
      )}
    </div>
  );
}
