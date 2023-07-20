module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}' /* src folder, for example */ ],
    theme: {
        extend: {
            colors: {
                'primary': '#1e88e5',
                'light': '#f9fafb',
                'dark': '#111928',
                'red': '#E80000',
            },
        },
        fontFamily: {
            'main': ['"Prompt"', 'sans-serif'],
            'title': ['"Integral CF"'],
        }
    },
    plugins: [
        require('flowbite/plugin')
    ],
};