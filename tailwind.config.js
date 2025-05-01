/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'pastel-blue': '#AEC6CF',
        'pastel-green': '#77DD77',
        'pastel-yellow': '#FFB347',
        'pastel-pink': '#FF6961',
        'pastel-purple': '#CFCFC4',
      },
    },
    container: {
      screens: {
        sm: '500px',
        md: '500px',
        lg: '500px',
        xl: '500px',
        '2xl': '500px',
      },
    },
  },

  plugins: [],
};
