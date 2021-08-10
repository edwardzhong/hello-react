import { AsyncsTree, ActionTree, BaseState, BaseAction } from 'types/type';
import { login, register, logout } from '../service';

export const state: BaseState = {
  loginInfo: { token: '' },
  user: { id: '1', name: 'jeff', email: 'jeff@gmail.com', },
};

export const actions: ActionTree<BaseState, BaseAction> = {
  setLogin({ loginInfo }, payload) {
    Object.assign(loginInfo, payload);
  },
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
    const res = await login(payload);
    if (res.code == 200) {
      dispatch('setLogin', res.data);
      localStorage.setItem('loginInfo', JSON.stringify(res.data));
    }
    return res;
  },
  async registerDis(dispatch, payload = {}) {
    const res = await register(payload);
    if (res.code == 200) {
      const loginRes = await login(payload);
      if (loginRes.code == 200) {
        dispatch('setLogin', loginRes.data);
        localStorage.setItem('loginInfo', JSON.stringify(loginRes.data));
      }
      return loginRes;
    } else {
      return res;
    }
  },
  async logoutDis(dispatch) {
    const res = await logout();
    if (res.code == 200) {
      dispatch('clearLogin');
      dispatch('clearUser');
      localStorage.removeItem('loginInfo');
    }
    return res;
  },
};