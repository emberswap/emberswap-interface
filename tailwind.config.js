const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}

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
          'blue-pink': ['var(--colors-blue)', 'var(--colors-pink)'],
          'green-yellow': ['var(--colors-green)', 'var(--colors-yellow)'],
          'pink-red-light-brown': ['var(--colors-red)', 'var(--colors-brown)'],
          yellow: ['var(--colors-yellow-one)', 'var(--colors-yellow-two)'],
          purple: ['var(--colors-purple-one)', 'var(--colors-purple-two)'],
        },
        background: {
          'dark-1000': 'var(--dark-1000)',
          'dark-900': 'var(--dark-900)',
          'dark-800': 'var(--dark-800)',
          'dark-pink-red': 'var(--dark-pink-red)',
        },
        border: {
          1: '1px',
          2: '2px',
          3: '3px',
          4: '4px',
        },
      },
      colors: {
        'bubble-gum': 'var(--color-light)',
        'bermuda': 'var(--color-black)',
        'light-purple': 'var(--color-light-purple)',
        purple: 'var(--color-purple)',
        'dark-purple': 'var(--color-dark-purple)',
        blue: withOpacity('--color-blue'),
        pink: 'var(--color-pink)',
        green: 'var(--color-green)',
        red: 'var(--color-red)',
        yellow: 'var(--color-yellow)',
        lgreen: 'var(--color-lgreen)',
        'light-green': 'var(--color-light-green)',
        'mid-green': 'var(--color-mid-green)',
        'opaque-green': 'var(--color-opaque-green)',
        'opaque-blue': 'var(--color-opaque-blue)',
        'opaque-pink': 'var(--color-opaque-pink)',
        'pink-red': 'var(--color-pink-red)',
        'light-brown': 'var(--color-light-brown)',
        'light-yellow': 'var(--color-light-yellow)',
        'mid-yellow': 'var(--color-mid-yellow)',
        'opaque-yellow': 'var(--color-opaque-yellow)',
        'cyan-blue': 'var(--color-cyan-blue)',
        'dark-pink': 'var(--color-dark-pink)',
        'dark-blue': 'var(--color-dark-blue)',
        'dark-1000': 'var(--color-dark-1000)',
        'dark-900': 'var(--color-dark-900)',
        'dark-900-custom': 'var(--color-dark-900-custom)',
        'dark-850': 'var(--color-dark-850)',
        'dark-800': 'var(--color-dark-800)',
        'dark-800-custom': 'var(--color-dark-800-custom)',
        'dark-7000': 'var(--color-dark-7000)',
        'dark-700': 'var(--color-dark-700)',
        'dark-600': 'var(--color-dark-600)',
        'dark-500': 'var(--color-dark-500)',
        'low-emphesis': 'var(--color-low-emphesis)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        'high-emphesis': 'var(--color-high-emphesis)',     
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
