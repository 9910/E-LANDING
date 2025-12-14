/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#e21837',
          dark: '#b5122c',
          light: '#ffe6ec',
        },
        accent: {
          DEFAULT: '#0EA5E9',
          soft: '#E0F2FE',
        },
        ink: '#0B1220',
        dusk: '#475467',
        mist: '#F5F7FB',
      },
      boxShadow: {
        soft: '0 24px 70px rgba(15, 23, 42, 0.08)',
        card: '0 18px 50px rgba(15, 23, 42, 0.06)',
      },
      backgroundImage: {
        'hero-mesh':
          'radial-gradient(circle at 20% 20%, rgba(94,116,255,0.16), transparent 55%), radial-gradient(circle at 85% 15%, rgba(14,165,233,0.18), transparent 45%)',
      },
    },
  },
  plugins: [],
};
