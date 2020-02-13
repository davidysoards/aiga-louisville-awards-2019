const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    fontFamily: {
      sans: ['GTHaptik', ...defaultTheme.fontFamily.sans],
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        overlay: 'rgba(0,0,0,0.6)',
      },
    },
  },
  variants: {},
  plugins: [],
};
