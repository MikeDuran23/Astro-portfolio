module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0a0e27',
          'bg-alt': '#16213e',
          'surface': '#1a1f3a',
          cyan: '#00d9ff',
          'cyan-light': '#00ffff',
          magenta: '#ff006e',
          purple: '#a502ff',
          'purple-light': '#c77dff',
        },
        primary: '#00d9ff',
        'primary-light': '#00ffff',
        'primary-dark': '#0099cc',
        secondary: '#a502ff',
        accent: '#ff006e',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 217, 255, 0.3)',
        'glow-magenta': '0 0 20px rgba(255, 0, 110, 0.3)',
        'glow-purple': '0 0 20px rgba(165, 2, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 217, 255, 0.2)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: '#d0d0d0',
            backgroundColor: 'transparent',
            h1: {
              color: '#00d9ff',
              fontFamily: 'Poppins, sans-serif',
              textShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
            },
            h2: {
              color: '#00ffff',
              fontFamily: 'Poppins, sans-serif',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              color: '#a502ff',
              fontFamily: 'Poppins, sans-serif',
            },
            a: {
              color: '#00d9ff',
              textDecoration: 'none',
              borderBottom: '1px solid transparent',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#00ffff',
                borderBottom: '1px solid #00d9ff',
              },
            },
            strong: {
              color: '#00ffff',
            },
            code: {
              color: '#00d9ff',
              backgroundColor: 'rgba(10, 14, 39, 0.8)',
              border: '1px solid rgba(0, 217, 255, 0.3)',
            },
            pre: {
              backgroundColor: 'rgba(10, 14, 39, 0.9)',
              borderLeft: '4px solid #00d9ff',
            },
            blockquote: {
              borderLeft: '4px solid #a502ff',
              color: '#b0b0b0',
            },
            td: {
              borderColor: 'rgba(0, 217, 255, 0.2)',
            },
            th: {
              backgroundColor: 'rgba(0, 217, 255, 0.1)',
              color: '#00ffff',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

