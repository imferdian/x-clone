import daisyui from "daisyui";
import daisyUiThemes from 'daisyui/src/theming/themes'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
        'light',
      {
        black: {
          ...daisyUiThemes["black"],
          primary: "rgb(43,168,75)",
          secondary: "rgb(24, 24, 24)",
        },
      },
    ],
  },
}