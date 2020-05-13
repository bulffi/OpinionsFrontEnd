import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index',
      routes:[
        { path: '/', component: '@/pages/Home'},
        { path: '/features', component: '@/pages/Features'},
        { path: '/pricing', component: '@/pages/Pricing'},
        { path: '/about', component: '@/pages/About'}
      ],
    },
  ],
  antd: {
  },
  dva: {},
  theme: {
    "primary-color":"#3c9ae8"
  }
});
