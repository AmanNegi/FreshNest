/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blackColor: "#020202",
        darkColor: "#0d2818",
        semiDarkColor: "#0d2818",
        lightColor: "#058c42",
        accentColor: "#16db65",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
