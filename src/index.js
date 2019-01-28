import React from 'react';
import ReactDOM from 'react-dom';
import '../public/less/index.less';//引入less

const title = 'Let\'s start to learn React Webpack Babel !';

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('content')
);

// import {sayHi} from './component/foo';
// import {consoleHi} from './component/bar';
// import list from './view/list.html';//引入html
// import detail from './view/detail.html';
// import '../public/css/index.css';//引入css

// setTimeout(() => {
//   document.getElementById('content').innerHTML=detail;
//   sayHi();
// }, 3000);

// consoleHi();
// document.getElementById('content').innerHTML=list;
