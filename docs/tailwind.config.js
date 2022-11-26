/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-links": "#1967d2",
            a: {
              "text-decoration": "none",
              "&:hover": {
                "text-decoration": "underline",
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
