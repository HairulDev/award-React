/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00AAB4',
        navy: '#3C3278',
        warning: '#FFD200',
        secondary: '#006778',
        general1: '#6167E7',
        error: '#FC5369',
        success: '#19B57E',
        general: '#889AAE',
        white: '#FFF',
        "dark": {
          "50": "#434343",
          "100": "#393939",
          "200": "#2f2f2f",
          "300": "#252525",
          "400": "#1b1b1b",
          "500": "#111111",
          "600": "#070707",
          "700": "#000000",
          "800": "#000000",
          "900": "#000000"
        }
      },
    },
  },
  plugins: [],
}