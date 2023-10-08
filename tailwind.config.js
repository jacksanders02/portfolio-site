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
          hover: "rgb(111,111,111)",
          dark: {
            DEFAULT: "rgb(252, 252, 252)",
            hover: "rgb(177, 177, 177)",
          },
        },
        primary: {
          DEFAULT: "#ffbef3",
          dark: "#CE6FC4",
        },
        secondary: {
          DEFAULT: "#ffffff",
          dark: "#383838",
        },
        accent: {
          DEFAULT: "#f06fcb",
          dark: "#CE6FC4",
        },
      },
    },
  },
  plugins: [],
};
