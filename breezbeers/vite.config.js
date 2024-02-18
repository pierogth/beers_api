import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

import path from 'path'

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
     resolve: {
        alias     : {
            '@'          : path.resolve(__dirname, 'resources/js'),
            '@hooks'     : path.resolve(__dirname, 'resources/js/hooks'),
            '@assets'    : path.resolve(__dirname, 'resources/js/assets/'),
            '@components': path.resolve(__dirname, 'resources/js/components')
        },
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
    },
});
