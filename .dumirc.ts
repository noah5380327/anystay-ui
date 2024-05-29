import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'anystay-ui',
    logo: '/logo.png',
    footer: false,
    favicons: [
      '/favicon.ico',
    ],
  },
});
