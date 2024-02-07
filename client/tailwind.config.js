/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        torus: [
          'Torus',
          'Inter',
          'Helvetica Neue',
          'Tahoma',
          'Arial',
          'Hiragino Kaku Gothic ProN',
          'Meiryo',
          'Microsoft YaHei',
          'Apple SD Gothic Neo',
        ],
      },
      colors: {
        error: '#ef4444',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
