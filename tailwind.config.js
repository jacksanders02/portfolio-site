/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        "colour-background": {
          DEFAULT: "#e0ffff",
          dark: "#0F052B",
        },
        "on-background": {
          DEFAULT: "rgb(5, 5, 5)",
          hover: "rgb(80, 80, 80)",
          dark: {
            DEFAULT: "rgb(252, 252, 252)",
            hover: "rgb(177, 177, 177)",
          },
        },
        primary: {
          DEFAULT: "#ff8bec",
          dark: "#CE6FC4",
        },
        secondary: {
          DEFAULT: "#d4cfcf",
          dark: "#F9F1F1",
        },
        accent: {
          DEFAULT: "#ff8bec",
          dark: "#CE6FC4",
        },
      },
    },
  },
  plugins: [],
};
