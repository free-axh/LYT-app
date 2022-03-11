import { defineConfig } from 'umi';

export default defineConfig({
  layout: {
    name: '康田智慧服务',
    locale: false,
    layout: 'side',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  publicPath: './',
  history: { type: 'hash' },
  // exportStatic: { htmlSuffix: true },
  headScripts: [
    {
      src: 'https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.2.js',
      type: 'text/javascript',
    },
  ],
  routes: [
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
    {
      name: '社团文化',
      icon: 'team',
      routes: [
        {
          path: '/groupCulture/topicList',
          component: '@/pages/groupCulture/topicList/index',
          name: '话题列表',
        },
        {
          path: '/groupCulture/expertList',
          component: '@/pages/groupCulture/expertList/index',
          name: '达人列表',
        },
        {
          name: '社群管理',
          path: '/groupCulture/communityManagement',
          component: '@/pages/groupCulture/communityManagement/index',
        },
        {
          path: '/groupCulture/releaseList',
          component: '@/pages/groupCulture/releaseList/index',
          name: '发布列表',
          hideInMenu: true,
        },
        {
          path: '/groupCulture/member',
          component: '@/pages/groupCulture/member/index',
          name: '社群成员',
          hideInMenu: true,
        },
      ],
    },
    {
      path: '/404',
      component: '@/pages/404',
    },
  ],
  fastRefresh: {},
  dynamicImport: {
    loading: '@/components/Loading',
  },
  proxy: {
    '/ocean': {
      // target: 'https://cuiguang.btdit.cn/',
      // target: 'http://cloud2.5gzvip.91tunnel.com',
      target: 'http://113.125.58.228:8090',
      changeOrigin: true,
      // pathRewrite: {
      //   '/ocean': '',
      // },
    },
  },
});
