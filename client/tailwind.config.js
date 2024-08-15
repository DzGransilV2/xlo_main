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
        myPriceTag:"#EBEBEB",
      },
      boxShadow:{
        myShadow:"-4px 4px 4px rgb(204 204 204 / 25%)"
      },
      backgroundImage:{
        myBackground:"linear-gradient(360deg, rgba(255,255,255,0) 20%, rgb(255, 255, 255) 40%)"
      },
      borderRadius:{
        myRound:"0.625rem"
      }
    },
  },
  plugins: [],
}

