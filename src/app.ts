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
