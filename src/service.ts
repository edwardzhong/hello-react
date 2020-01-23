import { post } from './common/request';

const login = (arg: any) => post('/sign', arg);
const register = (arg: any) => post('/register', arg);
const logout = (arg?: any) => post('/signout', arg);

export {
  login,
  register,
  logout,
};
