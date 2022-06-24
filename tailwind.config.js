module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'white': {
        'secondary': 'rgba(244, 244, 244, 0.75)',
        'primary': '#ffffff',
      },
      'black': {
        'secondary': '#4d5674',
        'dark': '#19181f',
        'primary': '#010e38',
      },
      'gray': {
        'primary': '#f4f4f4',
        'secondary': '#e4e4e4',
        'icon': '#c4c4c4',
      },
      'red': {
        'secondary': '#ffebeb',
        'primary': '#b90000',
      },
      'yellow': {
        'secondary': '#fbf8de',
        'primary': '#433d0b',
      },
      'orange': {
        'primary': '#ff6300'
      }
    },
    fontFamily: {
      poppins: ['Poppins', 'serif'],
    },
    spacing: {
      '0': '0px',
      '1': '1px',
      '1.5': '5px',
      '2': '7px',
      '2.5': '10px',
      '3': '12px',
      '3.5': '15px',
      '4': '17px',
      '5': '20px',
      '5.5': '22px',
      '6': '24px',
      '7': '27px',
      '8': '30px',
      '11': '44px',
      '11.5': '51px',
      '12': '60px',
      '20': '76px',
      '21': '77px',
      '25': '84px',
      '26': '93px',
      '27': '98px',
      '28': '111px',
      '30': '117px',
      '32': '123px',
      '32.5': '130px',
      '33': '135px',
      '35': '140px',
      '37': '157px',
      '38': '168px',
      '40': '186px',
      '52': '200px',
      '53': '202px',
      '60': '224px',
      '64': '266px',
      '68': '280px',
      '70': '300px',
      '75': '75%',
      '78': '328px',
      '82': '350px',
      '98': '395px',
      '99': '480px',
      'full': '100%',
      '102': '620px',
    },
    borderRadius: {
      'md': '5px',
      '2xl': '15px',
      '3xl': '30px',
      DEFAULT: "5px",
      'full': '50%',
    },
    fontSize: {
      'xs': '12px',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1350px',
      '2xl': '1536px',
    },
    inset: {
      '0': '0px',
      '3': '10px',
      '4': '12px',
      '3.5': '15px',
      '6': '20px',
      '8': '30px',
      '5': '35px',
      '10': '35px',
      '50': '50%',
      '35': '35%',
    },
    extend: {
      keyframes: {
        blowUp: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        blowDown: {
          '0%': {
            transform: 'scale(1)',
          },
          '100%': {
            transform: 'scale(0)',
          },
        }
      },
      animation: {
        blowUp: 'blowUp .4s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards',
        blowDown: 'blowDown .4s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards',
      }
    },
  },
  plugins: [],
}
