import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	base: '/dalshboard/',
	server: {
		host: '0.0.0.0',
	},
	build: {
		// GitHub Pages 배포를 위해 docs 폴더에 빌드되도록 지정
		outDir: 'docs',
	},
});
