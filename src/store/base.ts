import { AsyncsTree, ActionTree, BaseState } from 'type';
import { login, register, logout } from '../service';

export const state: BaseState = {
  loginInfo: { token: '' },
  user: { id: '1', name: 'jeff', email: 'jeff@gmail.com', },
};

export const actions: ActionTree<BaseState> = {
  clearLogin({ loginInfo }) {
    loginInfo.token = null;
  },
  setUser({ user }, payload = {}) {
    Object.assign(user, payload);
  },
  clearUser({ user }) {
    user.id = null;
    user.name = null;
    user.email = null;
  },
};

export const asyncs: AsyncsTree = {
  async loginDis(dispatch, payload = {}) {
    const ret = await login(payload);
    const { data } = ret;
    if (data.code == 200) {
      dispatch('setLogin', data.data);
      localStorage.setItem('loginInfo', JSON.stringify(data.data));
    }
    return ret;
  },
  async registerDis(dispatch, payload = {}) {
    const ret = await register(payload);
    const { data } = ret;
    if (data.code == 200) {
      const loginRet = await login(payload);
      const rdata = loginRet.data;
      if (rdata.code == 200) {
        dispatch('setLogin', rdata.data);
        localStorage.setItem('loginInfo', JSON.stringify(rdata.data));
      }
      return loginRet;
    } else {
      return ret;
    }
  },
  async logoutDis(dispatch) {
    const ret = await logout();
    const { data } = ret;
    if (data.code == 200) {
      dispatch('clearLogin');
      dispatch('clearUser');
      localStorage.removeItem('loginInfo');
    }
    return ret;
  },
};