module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}',"./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      boxShadow: {
        circle: '0 0 10px 5px rgba(99, 183, 177,1)',
      },
      colors: {
        primary: '#ff7506',
        secondary: '#A9A9B0',
        'primary-50': '#FFF2E7',
        'primary-300': '#FFAC6A',
        'primary-400': '#FF9138',
        'primary-500': '#FF7506',
        'primary-blue': '#4680FF',
        'primary-blue-300': '#568AFC',
        'primary-light-blue': 'rgba(66, 120, 255, 0.201)',
        'primary-red': '#FF5252',
        'primary-pink': '#F976B9',
        'primary-pink-300': '#EF83BA',
        'primary-organe': '#FF9A48',
        'primary-organe-50': '#FFF2E7',
        'primary-light-orange': 'rgba(255, 154, 72, 0.201)',
        'primary-green': '#92CD4F',
        'primary-green-300': '#9CCC65',
        'primary-green-500': '#34CD26',
        'primary-purple': '#8E90F8',
        'primary-purple-300': '#A5A6F6',
        'primary-gray-50': '#EAEAEC',
        'primary-gray-300': '#37474F',
        'primary-gray-400': '#535261',
        'primary-gray-light-400': '#7E7D88',
        'primary-gray-500': '#282739',
        'primary-gray-800': '#0A0A0E',
        'primary-light-gray': '#f6f6f6',
      },
    },
    screens: {
      '2xl': { max: '1440px' },
      // => @media (max-width: 1535px) { ... }

      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }

      sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [require('flowbite/plugin')],
};
