import { history } from 'umi';

export async function getInitialState() {
  return {
    name: 'admin',
  };
}

export const layout = {
  logout: () => {
    history.replace('/');
  },
};

(window as any).formAppUser = (user: any) => {
  console.log(1);
  console.log('user: ', user);
  const userJson = JSON.parse(user);
  window.sessionStorage.setItem('userData', user);
};
document.addEventListener('UniAppJSBridgeReady', function () {
  console.log(2);
  window.postMessage({
    data: {
      action: 'getUser',
    },
  });
});
