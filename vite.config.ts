import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import copy from 'rollup-plugin-copy'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  root:"src/",
  plugins: [
    vue(),
    vueJsx(),
    copy({
      targets: [
        { src: 'manifest.json', dest: 'extensions' }, // 复制 manifest.json 到 extensions 目录
        { src: "src/icons/**", dest: 'extensions/icons' } // 复制 src/icons/** 到 extensions/icons 目录
      ]
    })
  ],
  build: {
  outDir: path.resolve(__dirname, 'extensions'),
  rollupOptions: {
    input: {
      popup: path.resolve(__dirname, 'src/popup/index.html'),
      options: path.resolve(__dirname, 'src/options/index.html'),

      // contentPage: path.resolve(__dirname, 'src/contentPage/index.html'),
      content: path.resolve(__dirname, 'src/content/content.ts'),
      background: path.resolve(__dirname, 'src/background/service-worker.ts'),
    },
    output: {
      assetFileNames: 'assets/[name]-[hash].[ext]', // 静态资源
      chunkFileNames: 'js/[name]-[hash].js', // 代码分割中产生的 chunk
      entryFileNames: (chunkInfo) => { // 入口文件
        if (!chunkInfo?.facadeModuleId || !chunkInfo?.name) {
          return '[name]/[name].js';
        }
        const baseName = path.basename(chunkInfo.facadeModuleId, path.extname(chunkInfo.facadeModuleId));
        const saveArr = ['content', 'service-worker'];
        return `[name]/${saveArr.includes(baseName) ? baseName : chunkInfo.name}.js`;
      },
      name: '[name].js'
    }
  },
},
})
