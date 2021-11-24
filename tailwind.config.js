module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // I'm thinking we'll stick with the blue from the mockup.

        // Text Color
        "at-dark-blue": "#188a94",

        // Temp color for header
        "at-lighter-blue": "#C1F3F7",

        // likely color for assets
        "at-sky-blue": "#49D8E3",
        
        // Calandar border color
        "at-cal-blue": "#68FFF1",

        // original colors from original package.
        "at-light-green": "#44ba9f",
        "at-green": "#286d5d",
        "light-grey": "#f1f1f1",
      },
    },
    fontFamily: {
      Poppins: ["Poppins, sans-serif"],
    },
    flex: {
      "1": "1 1 0%",
      "2": "2 2 0%",
    },
    container: {
      center: true,
      screens: {
        lg: "1124px",
        xl: "1124px",
        "2xl": "1124px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
