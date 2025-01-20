/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blackColor: '#020202',
        darkColor: '#0d2818',
        semiDarkColor: '#0d2818',
        lightColor: '#058c42',
        accentColor: '#2FBF71',
        // accentColor: "#65A43E",
        // accentColor: "#16db65",
        labelColor: '#7190D8',
        lightBorderColor: '#D9D9D9',
        errorColor: '#E34035'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['poppins', 'sans-serif']
      }
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          accent: '#2FBF71',
          // accent: "#65A43E",
          // accent: "#16db65",
          primary: '#058c42',
          secondary: '#f6d860',
          neutral: '#3d4451',
          'base-100': '#ffffff'
        }
      }
    ]
  },
  plugins: [require('daisyui')]
};
