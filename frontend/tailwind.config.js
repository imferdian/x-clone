import daisyui from "daisyui";
import daisyUiThemes from 'daisyui/src/theming/themes'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        circle: 'circle7124 0.5s alternate infinite ease',
        shadow: 'shadow046 0.5s alternate infinite ease',
        blinkCursor: 'blinkCursor 0.5s step-end infinite alternate',
        typeAndDelete: 'typeAndDelete 4s steps(19) infinite',
      },
      keyframes: {
        circle7124: {
          '0%': { top: '60px', height: '5px', borderRadius: '50px 50px 25px 25px', transform: 'scaleX(1.7)' },
          '40%': { height: '20px', borderRadius: '50%', transform: 'scaleX(1)' },
          '100%': { top: '0%' },
        },
        shadow046: {
          '0%': { transform: 'scaleX(1.5)' },
          '40%': { transform: 'scaleX(1)', opacity: '0.7' },
          '100%': { transform: 'scaleX(0.2)', opacity: '0.4' },
        },
        blinkCursor: {
          '50%': { borderRightColor: 'transparent' },
        },
        typeAndDelete: {
          '0%, 10%': { width: '0' },
          '45%, 55%': { width: '9.1em' },
          '90%, 100%': { width: '0' },
        },
      }
    },
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