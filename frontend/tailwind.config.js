/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xxs: '0.6rem',
      xs: '0.75rem',
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    extend: { 
      colors: {
      backGroudGray: "hsl(220,14%,96%)",
      green: "hsl(159,99%,41%)",
      black : "black",
      grey: "hsl(227,10%,64%)",
      blue: "hsl(214,100%,55%)",
    },
    fontFamily:{
      railway : ['Raleway', 'sans-serif'],
      imFellFrenchCannon : ['IM Fell French Canon', 'serif'],
      Andika : ['Andika', 'sans-serif']
    }
  
  }
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar')
  ],
}

