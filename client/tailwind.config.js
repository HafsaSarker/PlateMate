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
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
