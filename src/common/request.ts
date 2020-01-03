import axios from 'axios'
import { api } from '../config/app'
import { AxiosFn } from 'types/context';

axios.defaults.baseURL = api;
axios.defaults.timeout = 20000;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

axios.interceptors.request.use(config => {
    const info = localStorage.getItem("selfInfo");
    const params = config.method == "get" ? config.params || {} : config.data || {};
    if (info) {
        const obj = JSON.parse(info);
        // if ( obj && obj.token) {
        //     Object.assign(params, { token: obj.token });
        // }
        if (obj.token) {
            config.headers.Authorization = 'Bearer ' + obj.token;
        }
    }
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
    return res.data;
});

export const form: AxiosFn = (url, data) => {
    return axios({
        headers: { 'Content-Type': 'multipart/form-data;chartset=UTF-8' },
        method: 'post',
        url,
        data
    }).then(res => {
        return res.data;
    }, (err: Error) => {
        return { code: -99, msg: err.message };
    });
}
export const get: AxiosFn = (url, param) => {
    return axios.get(url, { params: param }).then(res => {
        return res.data;
    }).catch((err: Error) => {
        return { code: -99, msg: err.message };
    })
}
export const post: AxiosFn = (url, param) => {
    return axios.post(url, param).then(res => {
        return res.data;
    }).catch((err: Error) => {
        return { code: -99, msg: err.message };
    })
}
export const put: AxiosFn = (url, param) => {
    return axios.put(url, param).then(res => {
        return res.data;
    }).catch((err: Error) => {
        return { code: -99, msg: err.message };
    })
}
export const del: AxiosFn = (url, param) => {
    return axios.delete(url, { data: param }).then(res => {
        return res.data;
    }).catch((err: Error) => {
        return { code: -99, msg: err.message };
    })
}
