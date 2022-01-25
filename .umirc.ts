import react from 'react';
import { defineConfig } from 'umi';

export default defineConfig({
  layout: {
    name: '康田智慧服务',
    locale: true,
    layout: 'side',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  headScripts: [
    'https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.2.js',
  ],
  routes: [
    // {
    //   path: '/',
    //   component: '@/pages/login/index',
    // },
    {
      name: '社区邻里',
      icon: 'team',
      path: '/neighborhoods',
      component: '@/pages/neighborhoods/index',
      routes: [
        {
          path: '/neighborhoods/thing',
          component: '@/pages/neighborhoods/thing/index',
          name: '好物列表',
        },
        {
          path: '/neighborhoods/apply',
          component: '@/pages/neighborhoods/apply/index',
          name: '申请列表',
        },
        {
          path: '/neighborhoods/management',
          component: '@/pages/neighborhoods/management/index',
          name: '分类管理',
        },
      ],
    },
    {
      name: '物业服务',
      icon: 'home',
      path: '/propertyService',
      component: '@/pages/propertyService/index',
      // headerRender: false,
      // footerRender: false,
      // menuRender: false,
      // menuHeaderRender: true,
      routes: [
        {
          path: '/propertyService/receive',
          component: '@/pages/propertyService/receive/index',
          name: '领用工单',
        },
      ],
    },
    {
      name: '垃圾分类',
      icon: 'interaction',
      path: '/garbageSorting',
      component: '@/pages/garbageSorting/index',
      routes: [
        {
          path: '/garbageSorting/receive',
          component: '@/pages/garbageSorting/record/index',
          name: '垃圾分类记录',
        },
      ],
    },
    {
      name: '交通',
      icon: 'CarOutlined',
      path: '/traffic',
      component: '@/pages/traffic/index',
      routes: [
        {
          path: '/traffic/information',
          component: '@/pages/traffic/information/index',
          name: '违停信息',
        },
        {
          path: '/traffic/register',
          component: '@/pages/traffic/register/index',
          name: '违停登记',
        },
      ],
    },
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      // target: 'http://113.125.27.99:53993',
      target: 'http://cloud2.5gzvip.91tunnel.com',
      changeOrigin: true,
      pathRewrite: {
        '/api': '',
      },
    },
  },
});
