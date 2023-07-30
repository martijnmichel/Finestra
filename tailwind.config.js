module.exports = {
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontWeight: ["hover", "focus"],
    },

    fontFamily: {
      sans: "Open Sans",
      merriweather: "Merriweather",
    },
  },
  variants: {
    extend: {
      scale: ["group-focus"],
    },
  },
  plugins: [require('@tailwindcss/container-queries')],
};
