import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      hr: {
        bg: "#ffffff",
        accent: "#0792c3",
        text: "#000000",
        "dark-brown": "#8D5347",
        "brown": "#B66A57",
        "light-brown": "#BB8378",
        "dark-cyan": "#2F90AE",
        "cyan": "#4CA2BA",
        "light-cyan": "#6EB0CB",
      },
    },
  },
  plugins: [],
};
export default config;
