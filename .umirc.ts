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
  routes: [
    {
      path: '/',
      component: '@/pages/login/index',
      headerRender: false,
      footerRender: false,
      menuRender: false,
      menuHeaderRender: true,
    },
    {
      name: '社区邻里',
      icon: 'smile',
      children: [
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
  ],
  fastRefresh: {},
});
