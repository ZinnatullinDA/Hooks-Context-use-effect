import path from 'node:path'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // plugins: [react()],
  plugins: [
    react(),
    AutoImport({
      imports: [
        'react',
        {
          'react-router-dom': [
            'useNavigate',
            'useParams',
            'useLocation',
          ],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
