/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        'colour-background': {
          DEFAULT: '#f1eee7',
          dark: '#0F052B',
        },
        'on-background': {
          DEFAULT: 'rgb(38, 44, 38)',
          hover: 'rgb(142,191,113)',
          dark: {
            DEFAULT: 'rgb(252, 252, 252)',
            hover: 'rgb(177, 177, 177)',
          },
        },
        primary: {
          DEFAULT: '#2d5936',
          dark: '#CE6FC4',
        },
        secondary: {
          DEFAULT: '#8ebf71',
          dark: '#383838',
        },
        accent: {
          DEFAULT: '#8ebf71',
          dark: '#CE6FC4',
        },
      },
    },
  },
  plugins: [],
};
