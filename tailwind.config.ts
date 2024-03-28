/** @type {import('tailwindcss').Config} */

import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

const pxToRem = (px: number, base = 16) => `${px / base}rem`

export const brand = {
  blue: '#0045FF',
  dark: '#131417',
  green: '#8efd93',
  grey: {
    average: '#797a7c',
    light: '#f1f5f9'
  },
  light: '#fff',
  navy: '#2e304b',
  pink: '#fd8e8e',
  red: '#fd8e8e',
  yellow: '#fde58e'
}

const config = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  safelist: [{ pattern: /(bg-brand|text-brand|outline-brand)-./ }],
  plugins: [forms, typography],
  theme: {
    extend: {
      colors: {
        brand
      },
      typography: ({ theme }: { theme: any }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.brand.grey.average'),
            '--tw-prose-headings': theme('colors.brand.dark'),
            '--tw-prose-lead': theme('colors.brand.dark'),
            '--tw-prose-links': theme('colors.brand.blue'),
            '--tw-prose-bold': theme('colors.brand.dark'),
            '--tw-prose-counters': theme('colors.brand.dark'),
            '--tw-prose-bullets': theme('colors.brand.dark'),
            '--tw-prose-hr': theme('colors.brand.dark'),
            '--tw-prose-quotes': theme('colors.brand.dark'),
            '--tw-prose-quote-borders': theme('colors.brand.dark'),
            '--tw-prose-captions': theme('colors.brand.dark'),
            '--tw-prose-code': theme('colors.brand.light'),
            '--tw-prose-pre-code': theme('colors.brand.light'),
            '--tw-prose-pre-bg': theme('colors.brand.dark'),
            '--tw-prose-th-borders': theme('colors.brand.dark'),
            '--tw-prose-td-borders': theme('colors.brand.dark')
            // '--tw-prose-invert-body': theme('colors.brand.light'),
            // '--tw-prose-invert-headings': theme('colors.brand.light'),
            // '--tw-prose-invert-lead': theme('colors.pink[300]'),
            // '--tw-prose-invert-links': theme('colors.brand.blue'),
            // '--tw-prose-invert-bold': theme('colors.brand.light'),
            // '--tw-prose-invert-counters': theme('colors.brand.light'),
            // '--tw-prose-invert-bullets': theme('colors.brand.light'),
            // '--tw-prose-invert-hr': theme('colors.pink[700]'),
            // '--tw-prose-invert-quotes': theme('colors.brand.light'),
            // '--tw-prose-invert-quote-borders': theme(
            //   'colors.brand.light',
            // ),
            // '--tw-prose-invert-captions': theme('colors.pink[400]'),
            // '--tw-prose-invert-code': theme('colors.white'),
            // '--tw-prose-invert-pre-code': theme('colors.pink[300]'),
            // '--tw-prose-invert-pre-bg': theme('colors.brand.dark'),
            // '--tw-prose-invert-th-borders': theme('colors.pink[600]'),
            // '--tw-prose-invert-td-borders': theme('colors.pink[700]')
          }
        }
      })
    },
    animation: {
      pulse: 'pulse 2.5s cubic-bezier(0.4, 0.0, 0.2, 1) infinite',
      ring: 'ring 2.5s cubic-bezier(0.4, 0.0, 0.2, 1) infinite'
    },
    keyframes: {
      pulse: {
        '0%, 25%': { transform: 'scale(1)' },
        '25%, 50%': { transform: 'scale(0.6)' },
        '50%, 75%': { transform: 'scale(1)' }
      },
      ring: {
        '25%, 50%': { 'outline-offset': '2px', opacity: 0 },
        '50%, 75%': { 'outline-offset': '7px', opacity: 0.5 },
        '75%, 100%': { 'outline-offset': '7px', opacity: 0 }
      }
    },
    fontSize: {
      'project-title': ['clamp(3rem, 10vw, 8rem)', { lineHeight: 1.1 }],
      xs: [
        pxToRem(12),
        {
          lineHeight: 1.4
        }
      ],
      sm: [
        pxToRem(14),
        {
          lineHeight: 1.4
        }
      ],
      base: [
        pxToRem(16),
        {
          lineHeight: 1.4
        }
      ],
      lg: [
        pxToRem(18),
        {
          lineHeight: 1.4
        }
      ],
      xl: [
        pxToRem(20),
        {
          lineHeight: 1.2
        }
      ],
      '2xl': [
        pxToRem(24),
        {
          lineHeight: 1.2
        }
      ],
      '3xl': [
        pxToRem(32),
        {
          lineHeight: 1.2
        }
      ],
      '4xl': [
        pxToRem(36),
        {
          lineHeight: 1.2
        }
      ],
      '5xl': [
        pxToRem(48),
        {
          lineHeight: 1.1
        }
      ],
      '6xl': [
        pxToRem(60),
        {
          lineHeight: 1.1
        }
      ],
      '7xl': [
        pxToRem(72),
        {
          lineHeight: 1.1
        }
      ],
      '8xl': [
        pxToRem(96),
        {
          lineHeight: 1.1
        }
      ],
      '9xl': [
        pxToRem(128),
        {
          lineHeight: 1.1
        }
      ]
    },
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      'max-2xl': { max: '1535px' },
      'max-xl': { max: '1279px' },
      'max-lg': { max: '1023px' },
      'max-md': { max: '767px' },
      'max-sm': { max: '639px' },
      'max-xs': { max: '374px' }
    },
    fontFamily: {
      display: ['Pumo', 'sans-serif'],
      sans: ['Inter', 'sans-serif']
    },
    transitionTimingFunction: {
      natural: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      inCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      outCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      inOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      inCirc: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
      outCirc: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
      inOutCirc: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
      inExpo: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
      outExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
      inOutExpo: 'cubic-bezier(1, 0, 0, 1)',
      inQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
      outQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      inOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
      inQuart: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
      outQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      inOutQuart: 'cubic-bezier(0.77, 0, 0.175, 1)',
      inQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
      outQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
      inOutQuint: 'cubic-bezier(0.86, 0, 0.07, 1)',
      inSine: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
      outSine: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
      inOutSine: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
      inBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
      outBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      inOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  }
}

export default config
