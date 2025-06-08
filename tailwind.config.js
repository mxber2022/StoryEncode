/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          850: '#1f2937',
          950: '#0f172a',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'metallic-gradient': 'linear-gradient(135deg, #374151 0%, #4b5563 25%, #6b7280 50%, #4b5563 75%, #374151 100%)',
        'chrome-gradient': 'linear-gradient(135deg, #9ca3af 0%, #d1d5db 25%, #f3f4f6 50%, #d1d5db 75%, #9ca3af 100%)',
      },
      boxShadow: {
        'metallic': '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'chrome': '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      },
    },
  },
  plugins: [],
};