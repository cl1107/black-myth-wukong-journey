import * as path from 'path';
import { defineConfig } from 'rspress/config';
import { pluginGoogleAnalytics } from 'rsbuild-plugin-google-analytics';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'black-myth-wukong-journey',
  description: 'black-myth-wukong-journey',
  icon: '/favicon.ico',
  //换成黑神话logo
  logo: {
    light: '/faviconimage.png',
    dark: '/faviconimage.png',
  },
  lang: 'en',
  themeConfig: {
    enableContentAnimation: true,
    hideNavbar: 'auto',
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/cl1107/black-myth-wukong-journey',
      },
    ],
  },
  builderConfig:{
    plugins: [
      pluginGoogleAnalytics({ id: 'G-1KEFT7S8MT' }),
    ]
  },
  locales: [
    {
      lang: 'zh',
      label: '简体中文',
      editLink: {
        docRepoBaseUrl:
          'https://github.com/cl1107/black-myth-wukong-journey/tree/main/docs',
        text: '📝 在 GitHub 上编辑此页',
      },
      prevPageText: '上一篇',
      nextPageText: '下一篇',
      outlineTitle: '目录',
      searchPlaceholderText: '搜索',
      searchNoResultsText: '未搜索到相关结果',
      searchSuggestedQueryText: '可更换不同的关键字后重试',
    },
    {
      lang: 'en',
      label: 'English',
      editLink: {
        docRepoBaseUrl:
          'https://github.com/cl1107/black-myth-wukong-journey/tree/main/docs',
        text: '📝 Edit this page on GitHub',
      },
      searchPlaceholderText: 'Search',
    },
  ],
  base:'/black-myth-wukong-journey/'
});
