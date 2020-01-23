import { css } from 'styled-components';

// const fontColor = '#555';
// const blue = 'hsl(205, 87%, 49%)';
// const gray = '#999';

export const imagebg = css`
    background-repeat: no-repeat;
    background-size:contain;
    background-position: 50%;`;

export const nowrap = css`
    white-space: nowrap;
    word-break:break-all;
    overflow: hidden;
    text-overflow: ellipsis;`;

export const nowrapTwo = css`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    word-break:break-all;
    overflow: hidden;`;
