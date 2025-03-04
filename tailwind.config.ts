import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        monserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      backgroundImage: {
        'footer-image': "url('/images/footer_image.webp')",
        'hero-image': "url('/images/hero-image.webp')",
        'about-hero': "url('/images/about-hero.webp')",
        'about-us-image': "url('/images/about-us-image-2.webp')",
        'brands-hero': "url('/images/brand-hero3.webp')",
        'brand-todo-logos': "url('/images/brand-todo.webp')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#CE9659",
        secondary: "#1f344e",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.7s ease-in forwards",
      },
    },
  },
  plugins: [],
}) satisfies Config;
