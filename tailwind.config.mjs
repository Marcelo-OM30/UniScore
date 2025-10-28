import { join } from 'path';

export default {
    content: [
        join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'),
        join(__dirname, 'app/**/*.{js,ts,jsx,tsx}')
    ],
    theme: {
        extend: {
            colors: {
                mackenzie: {
                    red: '#D5001F',
                    blue: '#005DAA',
                    gray: '#555555',
                    white: '#FFFFFF',
                },
            },
        },
    },
    plugins: [],
};
