import { DOMAttributes } from 'react';

//为 jsx 添加自定义属性
declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    styleName?: string;
    css?: any;
    active?: any;
    visible?: any;
  }
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