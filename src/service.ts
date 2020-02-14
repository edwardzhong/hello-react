import { get, post } from './common/request';

export const login = (arg: any) => post('/sign', arg);
export const register = (arg: any) => post('/register', arg);
export const logout = (arg?: any) => post('/signout', arg);
export const getNewList = () => get(`home/bbs/new/page/1`)