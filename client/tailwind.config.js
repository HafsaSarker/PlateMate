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
        primary: '#FF9E66', // A warm orange for primary brand elements, evoking warmth and appetite
        secondary: '#55C477', // A fresh, complementary green for secondary elements, suggesting freshness and health
        accent: '#FF408C', // A vibrant pink for accents and calls-to-action, adding energy and contrast
        'accent-hover': '#E63682',
        background: '#FFF4E5', // A light cream background for a warm, inviting feel, echoing the warmth of shared meals
        'background-dark': '#EDE0D4',
        'background-darker': '#DDC6B0',
        'text-primary': '#404040', // Dark gray for primary text, ensuring readability and contrast
        'text-secondary': '#787878', // Lighter gray for secondary text, maintaining clarity while being softer than primary text
        error: '#dc3545', // A strong red for errors, alerting users effectively
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
