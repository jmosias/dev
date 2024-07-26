/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        special: ["var(--font-buda)"],
      },
      letterSpacing: {
        special: "0.5em",
      },
      colors: {
        primary: "var(--primary)",
        foreground: "var(--foreground)",
        "background-start": "var(--background-start)",
        "background-start-tp": "var(--background-start-tp)",
        "background-middle": "var(--background-middle)",
        "background-end": "var(--background-end)",
      },
    },
  },
  plugins: [],
};
