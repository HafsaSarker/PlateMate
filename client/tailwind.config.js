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
        'primary': '#f472b6', // A warm pink for primary buttons and highlights
        'secondary': '#fb923c', // A complementary orange for secondary elements
        'accent': '#facc15', // A sunny yellow for accents and call-to-actions
        'background': '#fef3c7', // A light cream background for a warm, inviting feel
        'text-primary': '#374151', // Dark gray for primary text
        'text-secondary': '#6b7280', // Lighter gray for secondary text
      },
      error: '#ef4444',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
