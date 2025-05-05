import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ".flowbite-react\\class-list.json"
  ],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      // '2xl': '1536px',
    },
    container: {
      center: true,
      padding: "20px"
    },
    colors: {
      white: "#ffffff",
      primaryColor: "#048CFF",
      darkColor: "#000000",
      grayColor: "9babba",
      secondaryColor: "#234a6b",
    },
    fontFamily: {
      sans: ["Cairo", "sans-serif"],
    },
    fontSize: {
      sm: '0.875rem',  // أصغر حجم
      base: '1rem',    // الحجم الأساسي
      lg: '1.125rem',  // الحجم الكبير
      xl: '1.5rem',    // الحجم الإضافي
    },

    extend: {},
  },
  plugins: [flowbiteReact],
};