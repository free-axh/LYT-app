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

window.formAppUser = (user) => {
  console.log(1);
  console.log('user: ', user);
  console.log('获取到的：', JSON.parse(user));
  const userJson = JSON.parse(user);
  // window.localStorage.setItem("user", JSON.stringify(userJson));
  // this.$store.dispatch()
  this.$store.commit('SET_USERINFO', userJson);
};
document.addEventListener('UniAppJSBridgeReady', function () {
  console.log(2);
  // window.postMessage({
  //   data: {
  //     action: 'getUser'
  //   }
  // });
});
