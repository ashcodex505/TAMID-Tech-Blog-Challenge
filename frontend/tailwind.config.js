/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Configure paths to all template files
  ],
  theme: {
    extend: {
      colors: {
        'tamid-blue': '#31B4EF',
        'tamid-blue-dark': '#1A91C9',
        'tamid-light': '#FFFFFF',
        'tamid-dark': '#202020',
        'bapred': '#DC2626', // Red color for the login page accent
        'tamid-gray': {
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },
    },
  },
  plugins: [],
} 