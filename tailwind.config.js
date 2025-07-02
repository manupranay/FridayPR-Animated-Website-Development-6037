/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors - Unique palette
        'electric-teal': '#00D4CC',      // Distinctive teal instead of basic blue
        'bright-orange': '#FF6B35',      // Energetic accent color
        'deep-purple': '#6C63FF',        // Creative, tech-forward
        'pure-white': '#FFFFFF',         // Clean, minimal
        'charcoal': '#2D3748',          // Professional dark
        'light-gray': '#F7FAFC',        // Subtle background
        'medium-gray': '#E2E8F0',       // Borders and dividers
        'success-green': '#10B981',     // Success states
        'warning-red': '#EF4444',       // Error states
        'neon-pink': '#FF10F0',         // Accent for special elements
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
        'text-flip': 'text-flip 0.6s ease-in-out',
        'wave': 'wave 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'bounce-in': 'bounce-in 0.5s ease-out',
        'rotate-3d': 'rotate-3d 0.6s ease-out',
        'morph': 'morph 0.4s ease-in-out',
        'slide-tools': 'slide-tools 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 5px rgba(0, 212, 204, 0.5)' },
          '100%': { boxShadow: '0 0 25px rgba(0, 212, 204, 0.8)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'text-flip': {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        'wave': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '25%': { transform: 'translateY(-5px)' },
          '50%': { transform: 'translateY(0px)' },
          '75%': { transform: 'translateY(5px)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0px)', opacity: 1 },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.3)', opacity: 0 },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        'rotate-3d': {
          '0%': { transform: 'perspective(1000px) rotateY(0deg)' },
          '100%': { transform: 'perspective(1000px) rotateY(360deg)' },
        },
        'morph': {
          '0%': { borderRadius: '20px', transform: 'scale(1)' },
          '50%': { borderRadius: '50px', transform: 'scale(1.05)' },
          '100%': { borderRadius: '20px', transform: 'scale(1)' },
        },
        'slide-tools': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00D4CC 0%, #6C63FF 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #FF6B35 0%, #00D4CC 100%)',
        'gradient-hero': 'linear-gradient(135deg, #F7FAFC 0%, #E2E8F0 50%, #FFFFFF 100%)',
        'gradient-neon': 'linear-gradient(135deg, #FF10F0 0%, #00D4CC 50%, #6C63FF 100%)',
      }
    },
  },
  plugins: [],
}