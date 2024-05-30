import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'anystay-ui',
    logo: '/logo.png',
    footer: false,
    favicons: ['/favicon.ico'],
    nav: [
      { title: 'Introduction', link: '/guide' },
      { title: 'Component', link: '/components/calendar' },
    ],
  },
});
