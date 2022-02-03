const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  // important: '#__next',
  // darkMode: true,
  mode: 'jit',
  future: {
    purgeLayersByDefault: true,
    applyComplexClasses: true,
  },
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    fontSize: {
      xxxs: '.55rem',
      xxs: '.75rem',
      xs: '.85rem',
      sm: '0.975rem',
      tiny: '0.975rem',
      baseline: '1rem',
      base: '1rem',
      lg: '1.225rem',
      xl: '1.35rem',
      '2xl': '1.6rem',
      '3xl': '2rem',
      '4xl': '2.35rem',
      '5xl': '3.1rem',
      '6xl': '4.1rem',
      '7xl': '5.1rem',
    },
    extend: {
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
      linearBorderGradients: {
        directions: {
          tr: 'to top right',
          r: 'to right',
        },
        colors: {
          'blue-pink': ['#992D2D', '#DCAE25'],
          'green-yellow': ['#F78A22', '#FFD166'],
          'pink-red-light-brown': ['#7C0C1F', '#F4A625'],
          yellow: ['#fcbd2c', '#fcbd2c'],
          purple: ['#611600', '#ffc000'],
        },
        background: {
          'dark-1000': '#000',
          'dark-900': '#111',
          'dark-800': '#1d1d1d',
          'dark-pink-red': '#4e3034',
        },
        border: {
          1: '1px',
          2: '2px',
          3: '3px',
          4: '4px',
        },
      },
      colors: {
        'light-purple': '#611600',
        purple: '#ffc000',
        'dark-purple': '#970d0d',
        blue: '#e5e01e',
        pink: '#c10e3d',
        green: '#be0d33',
        red: '#ff3838',
        yellow: '#ffc000',
        lgreen: '#f78a22',
        'light-green': '#f78a22',
        'mid-green': '#bf5915',
        'opaque-green': '#e4972e',
        'opaque-blue': '#d98b20',
        'opaque-pink': '#af1b0c',
        'pink-red': '#7C0C1F',
        'light-brown': '#F4A625',
        'light-yellow': '#ffe7a0',
        'mid-yellow': '#c3a150',
        'opaque-yellow': '#fcbd2c',
        'cyan-blue': '#F44336',
        'dark-pink': '#221825',
        'dark-blue': '#0F182A',
        'dark-1000': '#000000',
        'dark-900': '#080808',
        'dark-850': '#101010',
        'dark-800': '#101010',
        'dark-700': '#151515',
        'dark-600': '#303030',
        'dark-500': '#404040',
        'low-emphesis': '#575757',
        primary: '#BFBFBF',
        secondary: '#575757',
        'high-emphesis': '#E3E3E3',
        light: '#FAFAFA',
      },
      lineHeight: {
        '48px': '48px',
      },
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        hero: [
          '48px',
          {
            letterSpacing: '-0.02em;',
            lineHeight: '96px',
            fontWeight: 700,
          },
        ],
      },
      borderRadius: {
        none: '0',
        px: '1px',
        DEFAULT: '0.625rem',
      },
      boxShadow: {
        swap: '0px 50px 250px -47px rgba(254,217,103,0.29)',
        liquidity: '0px 50px 250px -47px rgba(126,22,23,0.23)',
        'pink-glow': '0px 57px 90px -47px rgba(236,109,7,0.15)',
        'blue-glow': '0px 57px 90px -47px rgba(254,217,103,0.17)',
        'pink-glow-hovered': '0px 57px 90px -47px rgba(236,109,7,0.30)',
        'blue-glow-hovered': '0px 57px 90px -47px rgba(254,217,103,0.34)',
        'yellow-glow': '20px 20px 20px 20px rgba(145,12,12,0.5)',
      },
      ringWidth: {
        DEFAULT: '1px',
      },
      padding: {
        px: '1px',
        '3px': '3px',
      },
      minHeight: {
        empty: '128px',
        cardContent: '230px',
        fitContent: 'fit-content',
      },
      dropShadow: {
        currencyLogo: '0px 3px 6px rgba(15, 15, 15, 0.25)',
      },
    },
  },
  variants: {
    linearBorderGradients: ['responsive', 'hover', 'dark'], // defaults to ['responsive']
    extend: {
      backgroundColor: ['checked', 'disabled'],
      backgroundImage: ['hover', 'focus'],
      borderColor: ['checked', 'disabled'],
      cursor: ['disabled'],
      opacity: ['hover', 'disabled'],
      placeholderColor: ['hover', 'active'],
      ringWidth: ['disabled'],
      ringColor: ['disabled'],
    },
  },
  plugins: [
    require('tailwindcss-border-gradient-radius'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.header-border-b': {
          background:
            'linear-gradient(to right, rgba(255, 209, 101, 0.5) 0%, rgba(255, 209, 101, 0.5) 100%) left bottom no-repeat',
          backgroundSize: '100% 1px',
        },
        '.token-stats-border-b': {
          background:
            'linear-gradient(to right, rgba(255, 209, 101, 0.5) 0%, rgba(255, 209, 101, 0.5) 100%) left bottom no-repeat',
          backgroundSize: '100% 2px',
        },
      })
    }),
  ],
}
