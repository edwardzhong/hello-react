import { createGlobalStyle } from 'styled-components'
import { fontBase } from './mixin'

const GlobalStyle = createGlobalStyle`body{
  p, h1, h2, h3, h4, h5, h6 {
    margin-bottom:0;
  }
  #root {
    width: 100%;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', STHeiti, 'Microsoft Yahei', Tahoma, Simsun, sans-serif;
    font-size: 24px;
    color: ${fontBase};
    line-height: 1.6;
  }
}`

export default GlobalStyle