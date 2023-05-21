/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "colour-background": {
          DEFAULT: "#fcfcfc",
          dark: "#0F052B",
        },
        "on-background": {
          DEFAULT: "#050505",
          dark: "#FCEDF9",
        },
        primary: {
          DEFAULT: "#ce6fc4",
          dark: "#CE6FC4",
        },
        secondary: {
          DEFAULT: "#d4cfcf",
          dark: "#F9F1F1",
        },
        accent: {
          DEFAULT: "#ce6fc4",
          dark: "#CE6FC4",
        },
      },
    },
  },
  plugins: [],
};
