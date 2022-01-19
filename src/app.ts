export async function getInitialState() {
  return {
    name: 'admin',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  };
}

export const layout = {
  logout: () => {
    alert('退出登录成功');
  },
};
