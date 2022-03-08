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
    // headerRender: false,
    // footerRender: false,
    // menuRender: false,
    // menuHeaderRender: false,
    ...initialState?.settings,
  };
};

window.formAppUser = (user: any) => {
  console.log('user: ', user);
  const userJson = JSON.parse(user);
  window.sessionStorage.setItem('userData', user);
};
document.addEventListener('UniAppJSBridgeReady', function () {
  console.log('postMessage');
  window.postMessage({
    data: {
      action: 'getUser',
    },
  });
});
