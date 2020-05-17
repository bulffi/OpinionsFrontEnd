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
        { path: '/about', component: '@/pages/About'},
        {
          path: '/portal', component: '@/pages/Portal',
          routes: [
            {path: '/portal', component: '@/pages/portal/Stat'},
            {path: '/portal/stat', component: '@/pages/portal/Stat'},
            {path: '/portal/manage', component: '@/pages/portal/Manage'},
            {path: '/portal/domain', component: '@/pages/portal/Domain'},
            {path: '/portal/payment', component: '@/pages/portal/Payment'}
          ]
        }
      ],
    },
  ],
  antd: {
  },
  dva: {},
  theme: {
  }
});
