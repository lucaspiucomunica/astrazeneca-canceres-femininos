/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../../*.*",
    "../../index.html",
    "../css/*.*",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#4A4B52',
        'rosa': '#E27FB4',
        'laranja': '#EB5F5B',
        'azul': '#102366',
        'light': '#FFD4D7',
      },

      // Container

      container: {
        center: true,
        screens: {
          '2xl': '1440px',
        }
      },

      // Fontes

      fontFamily: {
        'sans': ['deuterium-variable', 'sans-serif'],
      },

      screens: {
        'pp': '375px',
        'smp': '550px',
      },

      lineHeight: {
        'none': '1',
        'tight': '1.25',
        'snug': '1.375',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '2',
        'text': '140%',
        'display': '110%',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    },
  ],
}

