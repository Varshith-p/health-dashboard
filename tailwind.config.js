/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        xxl: "1300px",
      },
      colors: {
        "main-left": "#4FAFFF",
        "main-right": "#A5D6FF",
        light: "#D4ECFF",
        dark: "#2A3B49",
        "border-color": "#000000",
        "secondary-left": "#3981BD",
        "secondary-right": "#42A9FF",
      },
    },
  },
  plugins: [],
};
