import { DOMAttributes } from 'react';
import { AxiosResponse } from 'axios';

//为 jsx 添加自定义属性
declare module 'react' {
    interface HTMLAttributes<T> extends DOMAttributes<T> {
        styleName?: string
    }
}

type ResData = {
    code: number;
    data: any;
    msg: string;
}

declare interface AxiosFun {
    (url: string, param: any): Promise<AxiosResponse<ResData>>
}

// import * as axios from './axios'
// import * as context from './context'

// declare namespace Axios {
//     export type Data = axios.Data;
//     export type Response = axios.Response;
// }

// declare namespace Context {
//     export type Store = context.Store;
//     export type Action = context.Action;
//     export type Reducer = context.Reducer;
// }