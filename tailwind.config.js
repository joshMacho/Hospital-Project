/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ekuzoaMedium: ["Gilroy-Medium", "sans-serif"],
        ekuzoaBold: ["Gilroy-Bold", "sans-serif"],
        ekuzoaLight: ["Gilroy-Light", "sans-serif"],
      },
      backgroundImage: {
        loginBackground: "url('../assets/images/loginBg.jpg')",
      },
    },
  },
  plugins: [],
};
