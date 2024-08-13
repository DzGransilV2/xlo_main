/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        myPoppins: ['"Poppins"', 'sans-serif'],
      },
      colors:{
        myGrey:"#DADADA",
      },
      boxShadow:{
        myShadow:"-4px 4px 4px rgb(204 204 204 / 25%)"
      }
    },
  },
  plugins: [],
}

