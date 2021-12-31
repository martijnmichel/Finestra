export const blue = {
    // name your theme anything that could be a valid css selector
    // remember what you named your theme because you will use it as a class to enable the theme
    name: 'blue',
    // put any overrides your theme has here
    // just as if you were to extend tailwind's theme like normal https://tailwindcss.com/docs/theme#extending-the-default-theme
    extend: {
      colors: {
        primary: 'blue'
      }
    }
  }