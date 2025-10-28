import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({

    base: '/woods-etna-chalet-web/',
    plugins: [react()],
})