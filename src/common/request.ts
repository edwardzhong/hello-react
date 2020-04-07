import axios from 'axios';
import { AxiosFn } from 'type';
import { api } from '@/config/app';

axios.defaults.baseURL = api;
axios.defaults.timeout = 20000;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

axios.interceptors.request.use(config => {
  const params = config.method == "get" ? config.params || {} : config.data || {};
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = 'Bearer ' + token;
  params._t = Math.random();
  return config;
});

axios.interceptors.response.use(res => {
  if (res.data.code == 200) {
    if (res.config.url.search(/\/login\/sign/i) > -1 && res.data.data) {
      // storage.save(res.data.data);
    }
    if (res.config.url.search(/\/login\/signout/i) > -1) {
      // storage.clear();
    }
  }
  return res;
});

// axios.interceptors.response.use(res => {
//   if (res.config.url.search(/\/adminLogin/i) > -1 && res.data.code == 10010 && res.headers.Authorization) {
//     localStorage.setItem('token', res.headers.Authorization);
//   }
//   return res;
// });

export const form: AxiosFn = (url, data) => axios({
  headers: { 'Content-Type': 'multipart/form-data;chartset=UTF-8' },
  method: 'post',
  url,
  data,
}).then(res => res.data, (err: Error) => ({ code: -99, msg: err.message }));
export const get: AxiosFn = (url, param) => axios.get(url, { params: param }).then(res => res.data, (err: Error) => ({ code: -99, msg: err.message }));
export const post: AxiosFn = (url, param) => axios.post(url, param).then(res => res.data, (err: Error) => ({ code: -99, msg: err.message }));
export const put: AxiosFn = (url, param) => axios.put(url, param).then(res => res.data, (err: Error) => ({ code: -99, msg: err.message }));
export const del: AxiosFn = (url, param) => axios.delete(url, { data: param }).then(res => res.data, (err: Error) => ({ code: -99, msg: err.message }));
