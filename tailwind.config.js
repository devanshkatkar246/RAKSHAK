/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.25rem',
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        canvas: '#f5f5f5',
        paper: '#ffffff',
        'surface-alt': '#fafafa',
        ink: '#0a0a0a',
        'ink-soft': '#171717',
        'mid-gray': '#737373',
        hairline: '#e5e5e5',
        ember: '#e7000b',
        // Functional semantic bindings
        background: {
          DEFAULT: '#f5f5f5',
          secondary: '#fafafa',
        },
        surface: {
          DEFAULT: '#ffffff',
          sidebar: '#fafafa',
          card: '#ffffff',
          input: '#f5f5f5',
        },
        border: {
          DEFAULT: '#e5e5e5',
          hairline: '#e5e5e5',
        },
        content: {
          primary: '#0a0a0a',
          secondary: '#737373',
          muted: '#737373',
        },
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        geist: ['Geist', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        small: '6px',
        nested: '10px',
        lg: '10px',
        xl: '14px',
        '2xl': '18px',
        buttons: '18px',
        inputs: '18px',
        badges: '18px',
        '3xl': '24px',
        cards: '24px',
        full: '9999px',
      },
      boxShadow: {
        subtle: '0px 0px 0px 1px rgba(23, 23, 23, 0.05), 0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'subtle-2': '0px 0px 0px 0px rgba(0, 0, 0, 0)',
        card: '0px 0px 0px 1px rgba(23, 23, 23, 0.05), 0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
      },
      letterSpacing: {
        display: '-2.4px',
        'heading-lg': '-0.9px',
        heading: '-0.75px',
        'heading-sm': '-0.6px',
        caption: '0.6px',
      },
    },
  },
  plugins: [],
};
