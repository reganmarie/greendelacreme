/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [require("daisyui")],
  darkMode: 'class',
  theme: {
    screens: {
      1440: "2560px",
      1080: "1920px",
    },
    extend: {
      colors: {
        primary: {"50":"#ecfdf5","100":"#d1fae5","200":"#a7f3d0","300":"#6ee7b7","400":"#34d399","500":"#10b981","600":"#059669","700":"#047857","800":"#065f46","900":"#064e3b"},
        secondary: {"100":"#b5c1ac", "200":"#909B93"},
        lemon: "#ffdfac",
        tertiary: "#e1e5e8",
        darkgreen: "#2f4034",
      },
    },
  },
  daisyui: {
    logs: false,
    themes: ["emerald"],
  }
};
