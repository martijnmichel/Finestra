
module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontWeight: ['hover', 'focus'],
    },
  },
  variants: {
    extend: {
      scale: ['group-focus']
    }
  },
  plugins: [
   
  ]
};
