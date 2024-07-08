/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': {
        'min': '350px',
        'max': '905px'
      },
      'md': '906px',
    },
    extend: {
      fontFamily: {
        'roboto': ['Roboto'],
        'bebas-neue': ['Bebas Neue'],
        'inter': ['Inter'],
        'archivo-black': ['Archivo Black'],
        'rubik': ['Rubik'],
      },

      colors: {
        'dark-blue': '#002366',
        'leaf-green': '#137c1e',
        'hover-green': '#199926',
        'green': '#20B02E',
        'dark-green': '#11811E',
        'src-yellow': '#FFD500',
        'hover-yellow': '#E9C200',
        'btn-landing': '#619644',
        'btn-dark': '#4F7739',
        'light-steel': '#063081',
      }
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
  ],
  prefix: 'tw-',
}