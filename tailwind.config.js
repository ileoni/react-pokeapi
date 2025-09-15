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
        "base-600": "#FCF300",
        "base-500": "#FCF529",
        "base-400": "#FDF752",
        "base-300": "#FDF97A",
        "base-200": "#FEFBA3",
        "base-100": "#FEFDCC",
        "primary-100": "#FCF300",
        "primary-200": "#5EB8E6",
        "primary-300": "#ED4051",
        "secondary-100": "#212529",
        "secondary-200": "#EAEAEA",
        "secondary-300": "#893168",
        normal: "#E7E6F7",
        fire: "#DC2F02",
        grass: "#2B9348",
        flying: "#CAF0F8",
        fighting: "#9D0208",
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
        fairy: "#FFB3C1",
        water: "#00B4D8",
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
        'image-with-gradient': `
          linear-gradient(to right, #000D, #000A, #fff5),
          url('./assets/whos-that-pokemon.png')
        `
      },
    }
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.dash': { border: '1px dashed' },
        '.dash-all *': { border: '1px dashed' }
      })
    })
  ],
}

