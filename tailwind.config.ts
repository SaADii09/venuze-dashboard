import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fef2f0",
          100: "#fde1dd",
          200: "#ffc3bb",
          300: "#ffa599",
          400: "#ff8777",
          500: "#ff5037",
          600: "#e6452f",
          700: "#cc3b28",
          800: "#b33121",
          900: "#99271a",
        },
        accent: {
          coral: "#ff786a",
          orange: "#fe8b16",
          yellow: "#ffc332",
          beige: "#fdf5e8",
        },
        dark: {
          brown: "#372320",
          DEFAULT: "#372320",
        },
        light: {
          gray: "#f4f4f4",
          DEFAULT: "#f4f4f4",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        "card": "20px",
        "pill": "999px",
        "button": "10px",
      },
      spacing: {
        "15": "3.75rem",
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
