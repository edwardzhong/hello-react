import axios from 'axios'
import config from '../config/app'

axios.defaults.baseURL = config.url;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

axios.interceptors.request.use(function(config) {
    const info = localStorage.getItem("selfInfo");
    const params = config.method == "get" ? config.params || {} : config.data || {};
    if (info) {
        const obj = JSON.parse(info);
        if (!params.userId && obj && obj.id) {
            Object.assign(params, { userId: obj.id });
        }
    }
    params._t = Math.random();
    return config;
});

axios.interceptors.response.use(function(res) {
    if (res.data.code == 200) {
        if (res.config.url.search(/\/login\/sign/i) > -1 && res.data.data) {
            // storage.save(res.data.data);
        }
        if (res.config.url.search(/\/login\/signout/i) > -1) {
            // storage.clear();
        }
    }
    return res.data;
});

export const post = (url, param) => axios.post(url, param);
export const get = (url, param) => axios.get(url, param);
