/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#2B2B2B",
        background: "#F5F5F5",
        blue: "#142B33",
        g100: "#F8F8F8",
        g200: "#F2F2F2",
        g300: "#AFAFAF",
        g400: "#8E8E8E",
        error: "#EF4444",
      },
      fontSize: {
        xss: "10px",
        xl1: "22px",
      },
      borderRadius: {
        xl: "10px",
      },
    },
  },
  plugins: [],
};
