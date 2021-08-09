import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	build: {
		// GitHub Pages 배포를 위해 docs 폴더에 빌드되도록 지정
		outDir: 'docs',
	},
});
