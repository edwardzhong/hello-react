import { css } from 'styled-components';

export const fontBase = '#555';

export const imagebg = css`
  background-repeat: no-repeat;
  background-size:contain;
  background-position: 50%;`;

export const nowrap = css`
  white-space: nowrap;
  word-break:break-all;
  overflow: hidden;
  text-overflow: ellipsis;`;

export const nowraps = (l: number) => css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: ${l};
  word-break:break-all;
  overflow: hidden;`
