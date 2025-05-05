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
      '2xl': '1550px',
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
      sm: '14px',  // Overriding the small font size
      base: '18px', // Overriding the base (default) font size
      lg: '20px',   // Overriding the large font size
      xl: '24px',   // Overriding the extra-large font size
    },
    extend: {},
  },
  plugins: [flowbiteReact],
};