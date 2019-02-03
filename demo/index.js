import sayHi from './bar'
import sayHello from './foo'
import list from './view/list.html';//引入html
import detail from './view/detail.html';
// import '../public/less/index.less';//引入less

setTimeout(() => {
  document.getElementById('root').innerHTML=detail;
  sayHi();
}, 3000);

sayHello();
document.getElementById('root').innerHTML=list;
