import { defineConfig } from 'vitepress'
import nav from './nav.mjs'
import sidebar from './sidebar.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "小新的博客",
  // description: "A VitePress Site",
  base: '/doc-vitepress/',
  srcDir: 'docs',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.ico',
    search: {
      provider: 'local'
    },  
    nav,
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/WeiXinao' }
    ],
    outline: {
      level: [2, 6],
      label: '页面导航',
    }
  }
})
