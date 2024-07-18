import react from "@vitejs/plugin-react";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    react(),
    require("@tailwindcss/forms"),
    function ({ addBase }) {
      addBase({
        "*": {
          position: "relative",
        },
      });
    },
  ],
};
