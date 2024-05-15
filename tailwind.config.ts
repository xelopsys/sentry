import type { Config } from 'tailwindcss'

import {
  grayColor,
  greenColor,
  primaryColor,
  redColor,
  secondaryColor,
} from './settings/styles.json'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        xl: '2.5rem',
      },
      screens: {
        sm: '100%',
        xl: '1440px',
      },
    },
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)'],
      },
      colors: {
        primary: {
          5: primaryColor.c5,
          10: primaryColor.c10,
          80: primaryColor.c80,
          100: primaryColor.c100,
          120: primaryColor.c120,
        },
        secondary: {
          10: secondaryColor.c10,
          100: secondaryColor.c100,
          120: secondaryColor.c120,
        },
        gray: {
          5: grayColor.c5,
          10: grayColor.c10,
          20: grayColor.c20,
          60: grayColor.c60,
          70: grayColor.c70,
          100: grayColor.c100,
        },
        green: {
          5: greenColor.c5,
          10: greenColor.c10,
          20: greenColor.c20,
          100: greenColor.c100,
          140: greenColor.c140,
        },
        red: {
          100: redColor.c100,
        },
      },
      fontSize: {
        h1: [
          '56px',
          {
            lineHeight: '84px',
            fontWeight: '600',
          },
        ],
        h2: [
          '36px',
          {
            lineHeight: '54px',
            fontWeight: '600',
          },
        ],
        h3: [
          '30px',
          {
            lineHeight: '45px',
            fontWeight: '600',
          },
        ],
        'sub-header': [
          '24px',
          {
            lineHeight: '36px',
            fontWeight: '600',
          },
        ],
        title: [
          '20px',
          {
            lineHeight: '30px',
            fontWeight: '600',
          },
        ],
        'sub-title': [
          '18px',
          {
            lineHeight: '27px',
            fontWeight: '600',
          },
        ],
        'body-m': ['16px', '24px'],
        'body-s': ['14px', '21px'],
        'body-xs': ['12px', '18px'],
      },
      boxShadow: {
        'drop-to-bottom': '0px 8px 16px 0px #1F202714',
        'drop-to-top': '0px -8px 16px 0px #1F202714',
        marker: '0px 0px 14px 0px #5661724D',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
