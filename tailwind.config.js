/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#023F86",
        secondary: "#D7E8FD",
        base: "#4E4E4E",
      },
    },
  },
  plugins: [],
};
