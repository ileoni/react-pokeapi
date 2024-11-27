const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#212529",
        "secondary": "#495057",
        "tertiary": "#e9ecef",
        "blue-primary":  "#5EB8E6",
        "red-primary": "#ED4051",
        "red-secondary": "#ED405133",
        "yellow-6000": "#FCF300",
        "yellow-5000": "#FCF529",
        "yellow-4000": "#FDF752",
        "yellow-3000": "#FDF97A",
        "yellow-2000": "#FEFBA3",
        "yellow-1000": "#FEFDCC",
        light: "#FFFFFF",
        dark: "#2E1C2B",
        normal: "#E7E6F7",
        fire: "#DC2F02",
        grass: "#2B9348",
        flying: "#CAF0F8",
        fighter: "#9D0208",
        poison: "#7B2CBF",
        electric: "#FFC300",
        ground: "#7F4F24",
        rock: "#A68A64",
        psychic: "#FF4D6D",
        ice: "#48CAE4",
        bug: "#80B918",
        ghost: "#560BAD",
        steel: "#E3D0D8",
        dragon: "#212529",
        dark: "#3C096C",
        pixie: "#FFB3C1",
        water: "#00B4D8",
      },
      fontFamily: {
        'anton': "'Anton', sans-serif",
        'cairo': "'Cairo', sans-serif",
        'montserrat': "'Montserrat', sans-serif",
        'roboto': "'Roboto', sans-serif",
      },
      fontSize: {
        "50": `${(50 / 16)}rem`,
        "40": `${(40 / 16)}rem`,
        "30": `${(30 / 16)}rem`,
        "25": `${(25 / 16)}rem`,
        "20": `${(20 / 16)}rem`,
        "16": `${(16 / 16)}rem`,
        "12": `${(12 / 16)}rem`,
        "50-to-35": `${35 / 16}rem`,
        "40-to-30": `${30 / 16}rem`,
        "30-to-25": `${25 / 16}rem`,
        "25-to-20": `${20 / 16}rem`,
        "20-to-16": `${16 / 16}rem`,
        "16-to-12": `${12 / 16}rem`,
      },
      backgroundImage: {
        'input': 'linear-gradient(45deg, #dedede77, transparent, #dedede77);',
        'input-error': 'linear-gradient(45deg, #ff000077, transparent, #ff000077);',
      }
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        'h1': { fontSize: `${(50 / 16)}rem` },
        'h2': { fontSize: `${(40 / 16)}rem` },
        'h3': { fontSize: `${(30 / 16)}rem` },
        'h4': { fontSize: `${(25 / 16)}rem` },
        'h5': { fontSize: `${(20 / 16)}rem` },
        'h6': { fontSize: `${(16 / 16)}rem` },
        '.bg-image-with-gradient': {
          backgroundImage: "linear-gradient(to top, black 10%, #000A, black 90%), url('./assets/whos-that-pokemon-1.png');"
        }
      })
    }),
    plugin(function ({ addComponents }) {
      addComponents([
        {
          '@media (max-width: 320px)': {
            'h1': { fontSize: `${(35 / 16)}rem` },
            'h2': { fontSize: `${(30 / 16)}rem` },
            'h3': { fontSize: `${(25 / 16)}rem` },
            'h4': { fontSize: `${(20 / 16)}rem` },
            'h5': { fontSize: `${(16 / 16)}rem` },
            'h6': { fontSize: `${(12 / 16)}rem` },
          }
        }
      ])
    })
  ],
}

