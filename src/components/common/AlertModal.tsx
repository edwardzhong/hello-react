import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import Backdrop from './Backdrop';

const PopLayer = styled.div`
  position: relative;
  margin: 0 auto;
  top: 100px;
  width: 300px;
  z-index: 100;
  border-radius: 8px;
  box-shadow: 0 0 2px 2px hsla(0,100%,0%,.1);
  /* box-shadow: 0 6px 20px 0 hsla(0, 0%, 0%, 0.19), 0 8px 17px 0 hsla(0, 0%, 0%, 0.2); */
  background-color: #fff;
  overflow: hidden;
  transform-style: preserve-3d;
  visibility: hidden;
  opacity: 0;
  transform: scale(0);
  transition: all .3s ease-in-out;
  ${props => props.active && css`
    visibility: visible;
    opacity: 1;
    transform: scale(1);`
  }`

const Body = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content:center;
  height: 80px;
  padding: 10px;
  text-align: center;
  font-size: 16px;
  border-bottom: 1px solid #eee;`

const Footer = styled.footer`
  display: flex;
  flex-flow:row wrap;
  justify-content:space-around;
  a{
    color: hsla(200,100%,50%,1);
    line-height: 4;
    cursor: pointer;
    &:hover{
        color: hsla(200,50%,50%,1);   
    }
  }`

let mousePos: { x: number, y: number } | null;
const getClickPosition = function getClickPosition(e: MouseEvent) {
  mousePos = {
    x: e.pageX - window.innerWidth / 2 + 150,
    y: e.pageY - 100
  };
  // 100ms 内发生过点击事件，则从点击位置动画展示
  // 否则直接 zoom 展示
  // 这样可以兼容非点击方式展开
  // 只有点击事件支持从鼠标位置动画展开
  setTimeout(() => {
    mousePos = null;
  }, 100);
};

if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
  document.documentElement.addEventListener('click', getClickPosition);
}

type Option = {
  el?: HTMLDivElement;
  visible?: boolean;
  title?: string;
  content?: string;
  onOk?: () => void;
  onCancel?: () => void;
}

class Model extends Component {
  state: Option = {
    visible: false,
    title: '',
    content: '',
    onOk: () => { },
    onCancel: () => { },
  }
  open = (opt: Option) => {
    this.setState({ ...opt });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ visible: true });
    }, 50);
  }

  close = () => {
    this.setState({ visible: false });
    setTimeout(() => {
      document.getElementById('modal-target').innerHTML = '';
    }, 350);
  }

  cancel = () => {
    this.close();
    this.state.onCancel();
  }

  confirm = () => {
    this.close();
    this.state.onOk();
  }

  render() {
    const { visible, title, content } = this.state
    return <>
      <Backdrop visible={ visible } >
        <PopLayer active={ visible } style={ { transformOrigin: `${mousePos ? mousePos.x + 'px' : '50%'} ${mousePos ? mousePos.y + 'px' : '50%'}` } }>
          <Body>
            { title && <h3> { title }</h3> }
            { content && <p>{ content }</p> }
          </Body>
          <Footer>
            <a onClick={ this.cancel }> cancel</a>
            <a onClick={ this.confirm }> yes</a>
          </Footer>
        </PopLayer>
      </Backdrop>
    </>
  }
}

const openDialog = (opt: Option) => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const Box = ReactDOM.render(React.createElement(Model), div);
  opt.el = div;
  return Box.open(opt)
};
export default openDialog;