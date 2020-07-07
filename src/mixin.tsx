import { css } from 'styled-components';

export const fontBase = '#555';

export const imgContain = (img: string) => css`
  background: url(${img}) no-repeat 50% / contain;`

export const imgCover = (img: string) => css`
  background: url(${img}) no-repeat 50% / cover;`

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
