import { DOMAttributes } from 'react';

//为 jsx 添加自定义属性
declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    styleName?: string;
    css?: any;
    active?: boolean;
  }
}