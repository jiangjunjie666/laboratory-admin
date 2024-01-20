import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
const env = loadEnv('development', process.cwd())
console.log(env)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //配置路径别名
  resolve: {
    alias: {
      '@': path.resolve('./src') // 相对路径别名配置，使用 @ 代替 src
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/variables.scss";'
      }
    }
  },
  //配置跨域
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        //设置跨域
        changeOrigin: true,
        //路径重写
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
