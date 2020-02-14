import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Mask from './mask';

const PopLayer = styled.div`
  position: relative;
  margin: 0 auto;
  top: 100px;
  width: 300px;
  z-index: 100;
  border-radius: 8px;
  box-shadow: 0 0 2px 2px hsla(0,100%,0%,.1);
  background-color: #fff;
  overflow: hidden;
  transition: all .3s ease-in-out;
  transform-style: preserve-3d;
  visibility:visible;
  visibility: ${props => props.active ? 'visible' : 'hidden'};
  opacity: ${props => props.active ? '1' : '0'};
  transform: ${props => props.active ? 'scale(1,1)' : 'scale(0,0)'};`

const Body = styled.div`
  display: flex;
  flex-flow:column nowrap;
  justify-content:center;
  height: 80px;
  padding: 10px;
  text-align: center;
  font-size: 16px;
  border-bottom:1px solid #eee;`

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
    x: e.pageX - window.innerWidth / 2 + 100,
    y: e.pageY - 100
  };
  // 100ms 内发生过点击事件，则从点击位置动画展示
  // 否则直接 zoom 展示
  // 这样可以兼容非点击方式展开
  setTimeout(() => {
    mousePos = null;
  }, 100);
}; // 只有点击事件支持从鼠标位置动画展开

if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
  document.documentElement.addEventListener('click', getClickPosition);
}

type Option = {
  title?: string;
  content?: string;
  onOk?: () => void;
  onCancel?: () => void;
}

class Model extends Component {
  state = {
    visible: false,
    title: '',
    content: '',
    onOk: () => { },
    onCancel: () => { },
  }
  open = (opt: Option) => {
    this.setState({ ...opt, visible: true });
  }

  close = () => {
    this.setState({ visible: false });
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
      <Mask visible={ visible } >
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
      </Mask>
    </>
  }
}
const div = document.createElement('div');
document.body.appendChild(div);
const Box = ReactDOM.render(React.createElement(Model), div);

export default Box;