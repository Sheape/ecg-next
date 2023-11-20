import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#0792c3",
      hr: {
        bg: "#ffffff",
        accent: "#0792c3",
        text: "#000000",
        "dark-brown": "#8D5347",
        "brown": "#B66A57",
        "light-brown": "#BB8378",
        "dark-cyan": "#2F90AE",
        "cyan": "#4CA2BA",
        "light-cyan": "#6EB0CB"
      },
    },
  },
  plugins: [nextui({
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#0792c3",
        }
      }
    }
  })],
  animation: {
    'flip': 'flip 5s linear infinite',
  },
  keyframes: {
    flip: {
      '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
      '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
    },
  },
};
export default config;
