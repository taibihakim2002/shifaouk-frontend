// import flowbiteReact from "flowbite-react/plugin/tailwindcss";

// /** @type {import('tailwindcss').Config} */
// export default {
//   darkMode: "class",
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     ".flowbite-react\\class-list.json"
//   ],
//   theme: {
//     screens: {
//       sm: "576px",
//       md: "768px",
//       lg: "992px",
//       xl: "1200px",

//     },
//     container: {
//       center: true,
//       padding: "20px",
//     },
//     colors: {
//       white: "#ffffff",
//       primaryColor: "#048CFF",
//       darkColor: "#000000",
//       grayColor: "#9babba",
//       secondaryColor: "#234a6b",
//     },
//     fontFamily: {
//       sans: ["Cairo", "sans-serif"],
//     },
//     fontSize: {
//       sm: '0.875rem',  // أصغر حجم
//       base: '1rem',    // الحجم الأساسي
//       lg: '1.125rem',  // الحجم الكبير
//       xl: '1.5rem',    // الحجم الإضافي
//     },

//     extend: {},
//   },
//   plugins: [flowbiteReact],
// };












import flowbiteReact from "flowbite-react/plugin/tailwindcss";
import colors from 'tailwindcss/colors'; // استيراد الألوان الافتراضية من Tailwind

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ".flowbite-react\\class-list.json" // Note: Ensure this path is correct for your OS/setup. Often it's 'node_modules/flowbite-react/**/*.js'
  ],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",   // شاشات كبيرة جدًا (لابتوبات قياسية)
      '2xl': "1540px", // شاشات أكبر (QHD - لابتوبات كبيرة وشاشات سطح مكتب)
      '3xl': "1920px"
    },
    container: {
      center: true,
      padding: "20px",
    },
    colors: {
      white: "#ffffff",
      primaryColor: "#048CFF",
      darkColor: "#000000",
      grayColor: "#9babba",
      secondaryColor: "#234a6b",
      slate: colors.slate,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue, // لاحظ أن لديك primary وهو أزرق، هذا يوفر درجات أزرق إضافية
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
      // It's often a good idea to include default Tailwind colors or extend them
      // For example, to keep Tailwind's default grays, blues, etc.
      // transparent: 'transparent',
      // current: 'currentColor',
      // gray: colors.gray, // from require('tailwindcss/colors')
      // You can also define shades for your custom colors:
      // primaryColor: {
      //   DEFAULT: "#048CFF",
      //   light: "#A3D5FF",
      //   dark: "#0056b3",
      // },
    },
    fontFamily: {
      sans: ["Cairo", "sans-serif"],
    },
    fontSize: { // مقياس الخطوط كما هو، سنعدل استخدام هذه الأحجام في المكونات
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
    },
    extend: {
      // You can also extend existing Tailwind utilities here if needed
      // For example, if you wanted to add only specific new font sizes
      // without redefining the entire fontSize scale:
      // fontSize: {
      //   '4xl': '2.25rem',
      //   '5xl': '3rem',
      // }
    },
  },
  plugins: [flowbiteReact],
};