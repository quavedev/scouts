const forms = require('@tailwindcss/forms');
const colors = require('tailwindcss/colors');

module.exports = {
  theme: {
    colors,
  },
  purge: [],
  darkMode: false, // or 'media' or 'class'
  variants: {},
  plugins: [forms],
};
