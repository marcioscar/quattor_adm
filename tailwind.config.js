module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    theme: {},
    extend: {
      fontFamily: {
        montserrat: "'Roboto', sans-serif",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        azul: {
          DEFAULT: "#009EDF",
        },
        laranja: {
          DEFAULT: "#F4921F",
        },
        verde: {
          DEFAULT: "#3BAA49",
        },
        vermelho: {
          DEFAULT: "#E51E25",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
