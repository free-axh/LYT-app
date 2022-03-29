import { history } from 'umi';

// export async function getInitialState() {
//   return {
//     name: 'admin',
//   };
// }

import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings };
}): BasicLayoutProps => {
  return {
    onPageChange: () => {
      const { location } = history;
      if (location.pathname === '/') {
        history.push('/neighborhoods/thing');
      }
    },
    headerRender: false,
    footerRender: false,
    menuRender: false,
    menuHeaderRender: false,
    ...initialState?.settings,
  };
};

// window.formAppUser = (user: any) => {
//   console.log('user: ', user);
//   const userJson = JSON.parse(user);
//   window.sessionStorage.setItem('userData', user);
// };
// document.addEventListener('UniAppJSBridgeReady', function () {
//   console.log('postMessage');
//   window.postMessage({
//     data: {
//       action: 'getUser',
//     },
//   });
// });

// 事件监听
window.addEventListener('message', function (event) {
  const { data } = event;
  console.log('接收到公共参数', data);
  if (data.APP_CONFIG) {
    const info = JSON.stringify(data.APP_CONFIG);
    window.localStorage.setItem('userData', info);
  }
});
//页面初始化时,向基础平台postMessage，请求获取公共参数
console.log('发送获取公共参数请求');
window.parent?.postMessage({ type: 'getAppConfig' }, '*');
